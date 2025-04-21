export interface IFilterKanji {
  selectedFilterBy: string;
  isMaximized: boolean;
  selectedParam: string;
}

export interface IBaseItem {
  char: string;
  hiragana: string;
  meaning: string;
  type: string;
  status: number;
  progression: string;
  currStreak: number;
  bestStreak: number;
  nextReview: string;
  unlockedDate: string;
  totalWrong: number;
  totalCorrect: number;
  // itemType: string;
}

// kanji
export interface IBaseKanji extends IBaseItem {
  reading: Reading;
  alternativeMeaning: any[];
  meaningData: MeaningData;
  readingData: ReadingData;
  similarKanji: SimilarKanji[];
  radicalCombination: RadicalCombination[];
  keyKanji: string[];
  keyRadical: string[];
  keyReading: string[];
  foundInVocab: FoundInVocab[];
}

export interface Reading {
  kunyomi: string[];
  onyomi: string[];
}

export interface MeaningData {
  mnemonic: string;
  hint: string;
}

export interface ReadingData {
  mnemonic: string;
  hint: string;
}

export interface SimilarKanji {
  char: string;
  hiragana: string;
  meaning: string;
  type: string;
}

export interface RadicalCombination {
  char: string;
  meaning: string;
  type: string;
}

export interface FoundInVocab {
  char: string;
  hiragana: string;
  meaning: string;
  type: string;
}

// radicals
export interface IBaseRadical extends IBaseItem {
  mnemonic: string;
  hint: string;
  foundIn: FoundIn[];
}

export interface FoundIn {
  char: string;
  hiragana: string;
  meaning: string;
  type: string;
}
// vocabulary
export interface IBaseVocabulary extends IBaseItem {
  wordType: string[];
  meaningData: MeaningData;
  readingData: ReadingData;
  kanjiComposition: KanjiComposition[];
  pattern: Pattern[];
  sentence: Sentence[];
  keyKanji: string[];
}

export interface KanjiComposition {
  char: string;
  hiragana: string;
  meaning: string;
  type: string;
}

export interface Pattern {
  word: string;
  examples: Example[];
}

export interface Example {
  word: string;
  meaning: string;
}

export interface Sentence {
  word: string;
  meaning: string;
}
