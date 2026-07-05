export type EngineeringBranch = 'CSE' | 'ECE' | 'EEE' | 'EIE' | 'Mechanical';

export interface Blueprint {
  id: string;
  name: string;
  branch: EngineeringBranch;
  domain: string;
  idea: string;
  timeline: string;
  budget: string;
  teamSize: string;
  skillLevel: string;
  resources: string;
  healthScore: number;
  noveltyScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  techStack: string[];
  hardware: string[];
  software: string[];
  timelineSteps: {
    phase: string;
    duration: string;
    tasks: string[];
  }[];
  risks: {
    title: string;
    mitigation: string;
    severity: 'Low' | 'Medium' | 'High';
  }[];
  futureScope: string[];
  patentPotential: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  branch: EngineeringBranch;
  college: string;
  avatar: string;
  theme: 'Light' | 'Warm Slate';
}
