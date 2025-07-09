import { useState, useEffect } from "react";
import type { Item } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockItems } from "@/data/mockItems";

export function useItemStore(loading: boolean) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const loadedItems = loadFromStorage(STORAGE_KEYS.items, mockItems);
    // Type cast the loaded items to ensure proper typing
    setItems(loadedItems as Item[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.items, items);
    }
  }, [items, loading]);

  return { items, setItems };
}
