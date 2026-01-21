
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  rank: number;
  teamId?: string;
  achievements: string[];
  themeColor?: 'blue' | 'purple' | 'green';
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // User IDs
  score: number;
  rank: number;
  motto: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'solo' | 'team';
  status: 'deployed' | 'in-progress' | 'archived';
  date: string;
  techStack: string[];
}

export interface Proposal {
  id: string;
  author: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export type View = 'auth' | 'dashboard' | 'teams' | 'proposals' | 'awards' | 'settings' | 'projects';
