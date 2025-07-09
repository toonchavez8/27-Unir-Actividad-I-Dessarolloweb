import { useState, useEffect } from "react";
import type { NPC } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockNPCs } from "@/data/mockNPCs";

export function useNPCStore(loading: boolean) {
  const [npcs, setNpcs] = useState<NPC[]>([]);

  useEffect(() => {
    const loadedNpcs = loadFromStorage(STORAGE_KEYS.npcs, mockNPCs);
    // Type cast the loaded NPCs to ensure proper typing
    setNpcs(loadedNpcs as NPC[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.npcs, npcs);
    }
  }, [npcs, loading]);

  return { npcs, setNpcs };
}
