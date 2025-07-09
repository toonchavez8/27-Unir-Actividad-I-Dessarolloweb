import { useState, useEffect } from "react";
import type { CanvasData } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";

export function useCanvasStore(loading: boolean) {
  const [canvasData, setCanvasData] = useState<CanvasData[]>([]);

  useEffect(() => {
    const loadedCanvas = loadFromStorage(STORAGE_KEYS.canvas, []);
    setCanvasData(loadedCanvas);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.canvas, canvasData);
    }
  }, [canvasData, loading]);

  return { canvasData, setCanvasData };
}
