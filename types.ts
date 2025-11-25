export type Theme = 'minimal' | 'accent' | 'terminal';

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
}

export interface Metric {
  name: string;
  value: string;
  change: string; // e.g. "+15%"
  positive: boolean;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}
