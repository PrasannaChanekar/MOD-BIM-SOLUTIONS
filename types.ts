
export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type SubmissionType = 'project' | 'newsletter' | 'academy';

export interface Submission {
  id: number;
  type: SubmissionType;
  name?: string;
  email: string;
  projectType?: string;
  message?: string;
  date: string;
  status: 'new' | 'read' | 'archived';
}
