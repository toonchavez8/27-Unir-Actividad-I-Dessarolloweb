import { useState, useEffect, useRef } from "react";
import type { Session } from "@/types/campaigns";
import type {
  SessionEvent,
  InitiativeEntry,
  SessionTab,
} from "@/types/session";
import type { NavigateFunction } from "react-router";

export function useSessionRunner(
  session: Session | null,
  sessionId: string | undefined,
  navigate: NavigateFunction,
  updateSession: (id: string, updates: Partial<Session>) => void,
) {
  // Session State
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [sessionEvents, setSessionEvents] = useState<SessionEvent[]>([]);

  // UI State
  const [activeTab, setActiveTab] = useState<SessionTab>("notes");
  const [currentLocation, setCurrentLocation] = useState("");
  const [initiative, setInitiative] = useState<InitiativeEntry[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Timer Effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addEvent = (
    type: SessionEvent["type"],
    content: string,
    npcs?: string[],
    location?: string,
    metadata?: Record<string, unknown>,
  ) => {
    const event: SessionEvent = {
      id: Date.now().toString(),
      timestamp: sessionTime,
      type,
      content,
      npcs,
      location: location || currentLocation,
      metadata,
    };
    setSessionEvents((prev) => [...prev, event]);
  };

  const startSession = () => {
    setIsRunning(true);
    setIsPaused(false);
    addEvent("event", "Session started");
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
    addEvent("event", isPaused ? "Session resumed" : "Session paused");
  };

  const endSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    addEvent("event", "Session ended");

    // Update session with final notes and duration
    if (session && sessionId) {
      updateSession(sessionId, {
        ...session,
        status: "completed",
        duration: Math.floor(sessionTime / 60), // Convert to minutes
        summary: sessionEvents
          .filter((e) => e.type === "note")
          .map((e) => e.content)
          .join("\n"),
        notes: session.notes + "\n\n" + generateSessionSummary(),
      });
    }

    navigate(`/campaigns/${session?.campaignId}/sessions/${sessionId}`);
  };

  const generateSessionSummary = () => {
    const noteEvents = sessionEvents.filter((e) => e.type === "note");
    const combatEvents = sessionEvents.filter((e) => e.type === "combat");
    const eventEvents = sessionEvents.filter((e) => e.type === "event");

    return `Session Summary - ${formatTime(sessionTime)}
    
Events: ${eventEvents.length}
Combat Encounters: ${combatEvents.length}
Notes: ${noteEvents.length}

Timeline:
${sessionEvents.map((e) => `[${formatTime(e.timestamp)}] ${e.content}`).join("\n")}`;
  };

  return {
    // Session State
    isRunning,
    isPaused,
    sessionTime,
    sessionEvents,
    // UI State
    activeTab,
    setActiveTab,
    currentLocation,
    setCurrentLocation,
    initiative,
    setInitiative,
    currentTurn,
    setCurrentTurn,
    // Actions
    startSession,
    pauseSession,
    endSession,
    addEvent,
    formatTime,
    generateSessionSummary,
  };
}
