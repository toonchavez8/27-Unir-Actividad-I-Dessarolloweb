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
