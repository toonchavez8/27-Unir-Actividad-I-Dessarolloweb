import { useState, useEffect } from "react";
import type { Shop } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockShops } from "@/data/mockShops";

export function useShopStore(loading: boolean) {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const loadedShops = loadFromStorage(STORAGE_KEYS.shops, mockShops);
    // Type cast the loaded shops to ensure proper typing
    setShops(loadedShops as Shop[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.shops, shops);
    }
  }, [shops, loading]);

  return { shops, setShops };
}
