export type UrgencyLevel = 'calm' | 'moderate' | 'urgent';

export type DocumentCategory = 'tax_legal' | 'medical' | 'education' | 'utility_bill' | 'general';

export interface JargonTerm {
  term: string;
  plainExplanation: string;
  analogy: string;
  doesItAffectMe: string;
}

export interface MicroAction {
  id: string;
  title: string;
  detailedGuide: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  substeps?: string[];
  category?: 'preparation' | 'action' | 'verification';
}

export interface KeyEntity {
  label: string;
  value: string;
  type: 'money' | 'deadline' | 'account' | 'reference' | 'contact';
  isUrgent?: boolean;
}

export interface ReplyTemplate {
  id: string;
  label: string;
  tone: string;
  subject: string;
  body: string;
}

export interface CognitiveAnalysis {
  id: string;
  createdAt: string;
  documentTitle: string;
  category: DocumentCategory;
  urgency: UrgencyLevel;
  urgencyReason: string;
  tenWordSummary: string;
  easyToReadText: string;
  rawInputText?: string;
  keyEntities: KeyEntity[];
  jargonDictionary: JargonTerm[];
  microActions: MicroAction[];
  replyTemplates: ReplyTemplate[];
}

export interface AccessibilitySettings {
  fontFamily: 'lexend' | 'dyslexic' | 'inter';
  fontSize: number; // in px
  lineSpacing: number; // multiplier e.g. 1.6
  letterSpacing: number; // in px
  theme: 'light' | 'sage' | 'sepia' | 'yellow' | 'dark';
  bionicReading: boolean;
  readingRuler: boolean;
  singleStepFocus: boolean;
  speechRate: number; // 0.8 - 1.5
}
