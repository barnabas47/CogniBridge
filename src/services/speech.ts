/**
 * Web Speech API Service
 * 100% Free client-side speech synthesis and recognition
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  public currentUtterance: SpeechSynthesisUtterance | null = null;
  public recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string, 
    options?: {
      rate?: number;
      lang?: string;
      onBoundary?: (charIndex: number, word: string) => void;
      onEnd?: () => void;
    }
  ) {
    if (!this.synth) return;

    this.stop();

    const cleanText = text.replace(/<[^>]*>/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = options?.rate || 1.0;
    utterance.lang = options?.lang || 'hu-HU';

    const voices = this.synth.getVoices();
    const huVoice = voices.find(v => v.lang.startsWith('hu')) || voices.find(v => v.lang.startsWith('en'));
    if (huVoice) {
      utterance.voice = huVoice;
    }

    if (options?.onBoundary) {
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const word = cleanText.substring(charIndex).split(/\s+/)[0];
          options.onBoundary!(charIndex, word);
        }
      };
    }

    if (options?.onEnd) {
      utterance.onend = () => {
        this.currentUtterance = null;
        options.onEnd!();
      };
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synth && (this.synth.speaking || this.synth.pending));
  }

  public startListening(
    onResult: (transcript: string) => void,
    onError: (err: any) => void
  ): () => void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError(new Error('Speech recognition not supported in this browser.'));
      return () => {};
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hu-HU';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onResult(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      onError(event.error);
    };

    recognition.start();
    this.recognition = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }
}

export const speechService = new SpeechService();
