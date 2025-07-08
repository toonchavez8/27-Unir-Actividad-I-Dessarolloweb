import { useState, useEffect } from "react";
import type { Location } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockLocations } from "@/data/mockLocations";

export function useLocationStore(loading: boolean) {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const loadedLocations = loadFromStorage(
      STORAGE_KEYS.locations,
      mockLocations,
    );
    // Type cast the loaded locations to ensure proper typing
    setLocations(loadedLocations as Location[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.locations, locations);
    }
  }, [locations, loading]);

  return { locations, setLocations };
}
