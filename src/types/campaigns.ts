export interface Campaign {
  id: string;
  title: string;
  description: string;
  worldName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: Session[];
  npcs: NPC[];
  locations: Location[];
  notes: string;
  imageUrl?: string;
}

export interface Session {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  summary: string;
  events: SessionEvent[];
  notes: string;
  status: "planned" | "completed" | "cancelled";
}

export interface SessionEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "combat" | "roleplay" | "exploration" | "puzzle" | "story";
}

export interface NPC {
  id: string;
  campaignId: string;
  name: string;
  race: string;
  class?: string;
  description: string;
  personality: string;
  motivations: string;
  secrets: string;
  relationships: Relationship[];
  location?: string;
  imageUrl?: string;
  status: "alive" | "dead" | "missing" | "unknown";
}

export interface Location {
  id: string;
  campaignId: string;
  name: string;
  type:
    | "city"
    | "town"
    | "village"
    | "dungeon"
    | "wilderness"
    | "landmark"
    | "building";
  description: string;
  history: string;
  inhabitants: string[];
  secrets: string;
  mapUrl?: string;
  imageUrl?: string;
}

export interface Shop {
  id: string;
  campaignId: string;
  name: string;
  description: string;
  type:
    | "general"
    | "weapons"
    | "armor"
    | "magic"
    | "alchemy"
    | "tavern"
    | "blacksmith"
    | "other";
  locationId?: string;
  ownerId?: string; // NPC ID
  items: ShopItem[];
  imageUrl?: string;
  notes: string;
}

export interface Item {
  id: string;
  campaignId: string;
  name: string;
  type:
    | "weapon"
    | "armor"
    | "consumable"
    | "tool"
    | "treasure"
    | "magic"
    | "other";
  rarity:
    | "common"
    | "uncommon"
    | "rare"
    | "very rare"
    | "legendary"
    | "artifact";
  description: string;
  properties: string[];
  value: number; // in gold pieces
  weight: number; // in pounds
  imageUrl?: string;
  notes: string;
}

export interface ShopItem {
  itemId: string;
  quantity: number;
  price: number; // custom price for this shop
  available: boolean;
}

export interface Relationship {
  npcId: string;
  npcName: string;
  type: "ally" | "enemy" | "neutral" | "family" | "friend" | "rival";
  description: string;
}

export interface CanvasNode {
  id: string;
  type: "campaign" | "session" | "npc" | "location" | "shop" | "item";
  entityId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  type: "related" | "owns" | "located" | "contains" | "knows" | "custom";
  label?: string;
  color?: string;
}

export interface CanvasData {
  campaignId: string;
  nodes: CanvasNode[];
  connections: CanvasConnection[];
  zoom: number;
  panX: number;
  panY: number;
}
