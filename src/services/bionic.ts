/**
 * Bionic Reading Text Formatter
 * Dynamically bolds the fixation point (first 40-50%) of each word to guide the eye
 * and reduce cognitive fatigue for individuals with ADHD / Dyslexia.
 */
export function formatBionicReading(text: string): string {
  if (!text) return '';
  
  // Split paragraphs while preserving linebreaks
  const paragraphs = text.split(/\n/);
  
  return paragraphs.map(paragraph => {
    if (!paragraph.trim()) return '';
    
    const words = paragraph.split(/(\s+)/);
    
    return words.map(part => {
      // If it's whitespace or punctuation only, leave as is
      if (/^\s+$/.test(part) || /^[^\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$/.test(part)) {
        return part;
      }
      
      // Separate word from trailing punctuation
      const match = part.match(/^([^\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*)([\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+)([^\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*)$/);
      if (!match) return part;
      
      const [, prefix, word, suffix] = match;
      const length = word.length;
      let boldLength = 1;
      
      if (length <= 3) {
        boldLength = 1;
      } else if (length <= 5) {
        boldLength = 2;
      } else if (length <= 8) {
        boldLength = 3;
      } else if (length <= 11) {
        boldLength = 4;
      } else {
        boldLength = Math.ceil(length * 0.4);
      }
      
      const boldPart = word.slice(0, boldLength);
      const restPart = word.slice(boldLength);
      
      return `${prefix}<strong class="font-extrabold text-[var(--text-primary)]">${boldPart}</strong>${restPart}${suffix}`;
    }).join('');
  }).join('\n');
}
