import type { NPC } from "@/types/campaigns";

export function useNPCActions(
  npcs: NPC[],
  setNpcs: React.Dispatch<React.SetStateAction<NPC[]>>,
) {
  const createNPC = (npcData: Omit<NPC, "id">): NPC => {
    const newNPC: NPC = {
      ...npcData,
      id: Math.random().toString(36).substring(2, 11),
    };
    setNpcs((previousNpcs) => [...previousNpcs, newNPC]);
    return newNPC;
  };

  const updateNPC = (id: string, updates: Partial<NPC>) => {
    setNpcs((previousNpcs) =>
      previousNpcs.map((npc) => (npc.id === id ? { ...npc, ...updates } : npc)),
    );
  };

  const deleteNPC = (id: string) => {
    setNpcs((previousNpcs) => previousNpcs.filter((npc) => npc.id !== id));
  };

  const getNPCById = (id: string) => {
    return npcs.find((npc) => npc.id === id);
  };

  const getCampaignNPCs = (campaignId: string) => {
    return npcs.filter((npc) => npc.campaignId === campaignId);
  };

  return {
    createNPC,
    updateNPC,
    deleteNPC,
    getNPCById,
    getCampaignNPCs,
  };
}
