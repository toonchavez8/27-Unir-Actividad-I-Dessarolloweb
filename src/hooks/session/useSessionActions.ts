import type { Session } from "@/types/campaigns";

export function useSessionActions(
  sessions: Session[],
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>,
) {
  const createSession = (sessionData: Omit<Session, "id">): Session => {
    const newSession: Session = {
      ...sessionData,
      id: Math.random().toString(36).substring(2, 11),
    };
    setSessions((previousSessions) => [...previousSessions, newSession]);
    return newSession;
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === id ? { ...session, ...updates } : session,
      ),
    );
  };

  const deleteSession = (id: string) => {
    setSessions((previousSessions) =>
      previousSessions.filter((session) => session.id !== id),
    );
  };

  const getSessionById = (id: string) => {
    return sessions.find((session) => session.id === id);
  };

  const getCampaignSessions = (campaignId: string) => {
    return sessions.filter((session) => session.campaignId === campaignId);
  };

  return {
    createSession,
    updateSession,
    deleteSession,
    getSessionById,
    getCampaignSessions,
  };
}
