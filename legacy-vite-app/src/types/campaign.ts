export interface Campaign {
  id: string;
  title: string;
  description: string;
  worldName: string;
  status: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
  campaignId: string;
  duration?: number; // in minutes
  summary?: string;
  notes?: string;
  events?: SessionEvent[];
  encounters?: Encounter[];
}

export interface SessionEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: "combat" | "roleplay" | "exploration" | "other";
}

export interface Encounter {
  id: string;
  name: string;
  description: string;
  monsters: Monster[];
  difficulty: "easy" | "medium" | "hard" | "deadly";
  environment?: string;
  rewards?: string[];
}

export interface Monster {
  id: string;
  name: string;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  initiative?: number;
  conditions?: string[];
}

export interface NPC {
  id: string;
  campaignId: string;
  name: string;
}

export interface Location {
  id: string;
  campaignId: string;
  name: string;
}

export interface Shop {
  id: string;
  campaignId: string;
  name: string;
}

export interface Item {
  id: string;
  campaignId: string;
  name: string;
}
