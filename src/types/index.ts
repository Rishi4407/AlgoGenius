export interface LearningTrack {
  id: string;
  title: string;
  kicker: string;
  level: 'Foundations' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  description: string;
  image: string;
  coreLibraries: string[];
  mathFormulas: { name: string; formula: string; description: string }[];
  syllabus: { title: string; topics: string[]; pythonFocus: string }[];
  capstoneProject: { title: string; description: string; pythonStack: string };
}

export interface PythonLabTemplate {
  id: string;
  title: string;
  category: 'Neural Networks' | 'Transformers & LLMs' | 'Machine Learning' | 'Computer Vision' | 'Agentic AI';
  description: string;
  initialCode: string;
  parameters: {
    name: string;
    label: string;
    type: 'slider' | 'select' | 'number';
    min?: number;
    max?: number;
    step?: number;
    defaultValue: number | string;
    options?: { label: string; value: string }[];
    unit?: string;
  }[];
  expectedMetrics: {
    label: string;
    unit: string;
    key: string;
  }[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  phaseId: number;
  phaseName: string;
  durationWeeks: number;
  summary: string;
  skills: string[];
  pythonLibraries: string[];
  deliverables: string[];
  projectStarter: {
    name: string;
    description: string;
    snippet: string;
  };
}

export interface VideoLecture {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  thumbnail: string;
  category: string;
  overview: string;
  chapters: { time: string; title: string }[];
  keyTakeaways: string[];
  pythonCodeSample: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Math & Calculus' | 'Deep Learning' | 'LLMs & GenAI' | 'Computer Vision' | 'Infrastructure & MLOps';
  definition: string;
  mathNotation?: string;
  pythonSnippet: string;
  practicalTip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pythonRelevance: string;
}
