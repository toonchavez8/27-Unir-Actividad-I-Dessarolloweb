import { useParams, useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import { SessionHeader } from "./SessionHeader.tsx";
import { SessionSidebar } from "./SessionSidebar.tsx";
import { SessionTimeline } from "./SessionTimeline.tsx";
import { useSessionRunner } from "@/hooks/session/useSessionRunner";
import "./SessionRunner.css";

export function SessionRunner() {
  const { sessionId } = useParams<{ sessionId: string; campaignId?: string }>();
  const navigate = useNavigate();
  const { getSessionById, updateSession, campaigns, npcs, locations } = useCampaigns();
  
  const session = sessionId ? getSessionById(sessionId) ?? null : null;
  const campaign = session ? campaigns.find(c => c.id === session.campaignId) : null;
  const campaignNPCs = npcs.filter(npc => npc.campaignId === session?.campaignId);
  const campaignLocations = locations.filter(loc => loc.campaignId === session?.campaignId);

  const {
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
  } = useSessionRunner(session, sessionId, navigate, updateSession);

  if (!session || !campaign) {
    return (
      <div className="session-runner session-runner--error">
        <div className="session-runner__error-content">
          <h1 className="session-runner__error-title">Session Not Found</h1>
          <p className="session-runner__error-message">
            The session you're looking for doesn't exist or has been removed.
          </p>
          <button 
            className="session-runner__error-button"
            onClick={() => navigate("/sessions")}
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-runner page-container">
      <SessionHeader
        session={session}
        campaign={campaign}
        sessionTime={sessionTime}
        isRunning={isRunning}
        isPaused={isPaused}
        formatTime={formatTime}
        onStart={startSession}
        onPause={pauseSession}
        onEnd={endSession}
      />

      <div className="session-runner__content">
        <SessionSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          campaignNPCs={campaignNPCs}
          campaignLocations={campaignLocations}
          currentLocation={currentLocation}
          onLocationChange={setCurrentLocation}
          initiative={initiative}
          onInitiativeChange={setInitiative}
          currentTurn={currentTurn}
          onTurnChange={setCurrentTurn}
          onAddEvent={addEvent}
          isRunning={isRunning}
        />

        <SessionTimeline
          sessionEvents={sessionEvents}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
}

export default SessionRunner;
