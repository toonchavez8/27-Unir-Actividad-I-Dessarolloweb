export interface SessionEvent {
  id: string;
  timestamp: number;
  type: "note" | "combat" | "roleplay" | "event" | "location-change";
  content: string;
  npcs?: string[];
  location?: string;
  metadata?: Record<string, unknown>;
}

export interface InitiativeEntry {
  id: string;
  name: string;
  initiative: number;
  isPC: boolean;
  hp?: number;
  maxHp?: number;
  conditions?: string[];
  notes?: string;
}

export interface SessionRunnerState {
  isRunning: boolean;
  isPaused: boolean;
  sessionTime: number;
  sessionEvents: SessionEvent[];
  activeTab: "notes" | "npcs" | "combat" | "locations" | "actions";
  currentLocation: string;
  initiative: InitiativeEntry[];
  currentTurn: number;
}

export type SessionTab = "notes" | "npcs" | "combat" | "locations" | "actions";
