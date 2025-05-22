export interface Author {
  name: string;
  affiliation: string;
  email: string;
}

export interface Reference {
  id: string;
  authors: string;
  title: string;
  journal?: string;
  conference?: string;
  volume?: string;
  number?: string;
  pages?: string;
  year: string;
  doi?: string;
  url?: string;
}

export interface Figure {
  id: string;
  src: string;
  caption: string;
  width?: number;
  height?: number;
}

export interface Table {
  id: string;
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'figure' | 'table' | 'equation';
  figureId?: string;
  tableId?: string;
}

export interface PaperData {
  title: string;
  authors: Author[];
  abstract: string;
  keywords: string[];
  sections: Section[];
  references: Reference[];
  figures: Figure[];
  tables: Table[];
}

export interface EditorConfig {
  showLineNumbers: boolean;
  fontSize: number;
  theme: 'light' | 'dark';
  autoSave: boolean;
} 