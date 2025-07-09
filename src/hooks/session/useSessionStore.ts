import { useState, useEffect } from "react";
import type { Session } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockSessions } from "@/data/mockSessions";

export function useSessionStore(loading: boolean) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const loadedSessions = loadFromStorage(STORAGE_KEYS.sessions, mockSessions);
    const processedSessions = loadedSessions.map((session) => ({
      ...session,
      date: new Date(session.date),
    }));
    // Type cast the processed sessions to ensure proper typing
    setSessions(processedSessions as Session[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.sessions, sessions);
    }
  }, [sessions, loading]);

  return { sessions, setSessions };
}
