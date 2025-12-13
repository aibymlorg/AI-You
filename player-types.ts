export interface Player {
  id: string;
  username: string;
  email: string;
  password: string; // In a real app, this would be hashed
  createdAt: string;
  xp: number;
  badges: string[];
  completedMissions: number[];
}

export interface PlayerCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
