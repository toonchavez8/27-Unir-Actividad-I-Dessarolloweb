export const STORAGE_KEYS = {
  campaigns: "dnd_campaigns",
  sessions: "dnd_sessions",
  npcs: "dnd_npcs",
  locations: "dnd_locations",
  shops: "dnd_shops",
  items: "dnd_items",
  canvas: "dnd_canvas",
};

export const loadFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, data: T[]) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to session storage:", error);
  }
};
export const clearStorage = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Failed to clear session storage:", error);
  }
};
