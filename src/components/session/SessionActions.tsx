import { useState } from "react";
import { 
  FaDiceD6, 
  FaPlus, 
  FaUsers, 
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import { GiDiceTarget } from "react-icons/gi";
import type { SessionEvent } from "@/types/session";
import "./SessionActions.css";

interface SessionActionsProps {
  readonly onAddEvent: (type: SessionEvent["type"], content: string, npcs?: string[], location?: string, metadata?: Record<string, unknown>) => void;
  readonly isRunning: boolean;
  readonly currentLocation: string;
}

export function SessionActions({ onAddEvent, isRunning, currentLocation }: SessionActionsProps) {
  const [quickNote, setQuickNote] = useState("");
  const [diceResult, setDiceResult] = useState<number | null>(null);

  const rollD20 = () => {
    const result = Math.floor(Math.random() * 20) + 1;
    setDiceResult(result);
    onAddEvent("event", `Rolled d20: ${result}`, [], currentLocation, { diceType: "d20", result });
    setTimeout(() => setDiceResult(null), 3000);
  };

  const rollD6 = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);
    onAddEvent("event", `Rolled d6: ${result}`, [], currentLocation, { diceType: "d6", result });
    setTimeout(() => setDiceResult(null), 3000);
  };

  const addQuickEvent = (type: SessionEvent["type"], content: string) => {
    if (isRunning) {
      onAddEvent(type, content, [], currentLocation);
    }
  };

  const handleQuickNote = () => {
    if (quickNote.trim() && isRunning) {
      onAddEvent("note", quickNote.trim(), [], currentLocation);
      setQuickNote("");
    }
  };

  const quickActions = [
    {
      id: "combat-start",
      label: "Start Combat",
      icon: GiDiceTarget,
      type: "combat" as SessionEvent["type"],
      content: "Combat encounter started",
      color: "red"
    },
    {
      id: "roleplay",
      label: "Roleplay Scene",
      icon: FaUsers,
      type: "roleplay" as SessionEvent["type"],
      content: "Roleplay scene begins",
      color: "purple"
    },
    {
      id: "location-discovery",
      label: "New Location",
      icon: FaMapMarkerAlt,
      type: "location-change" as SessionEvent["type"],
      content: "Discovered new location",
      color: "orange"
    },
    {
      id: "important-event",
      label: "Important Event",
      icon: FaExclamationTriangle,
      type: "event" as SessionEvent["type"],
      content: "Something important happened",
      color: "yellow"
    },
    {
      id: "objective-complete",
      label: "Objective Complete",
      icon: FaCheckCircle,
      type: "event" as SessionEvent["type"],
      content: "Objective completed",
      color: "green"
    }
  ];

  return (
    <div className="session-actions">
      <div className="session-actions__section">
        <h4 className="session-actions__title">Quick Note</h4>
        <div className="session-actions__quick-note">
          <input
            type="text"
            className="session-actions__note-input"
            placeholder="Add quick note..."
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuickNote()}
            disabled={!isRunning}
          />
          <button
            className="session-actions__note-button"
            onClick={handleQuickNote}
            disabled={!quickNote.trim() || !isRunning}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="session-actions__section">
        <h4 className="session-actions__title">Dice Rolls</h4>
        <div className="session-actions__dice">
          <button
            className="session-actions__dice-button"
            onClick={rollD20}
            disabled={!isRunning}
            title="Roll d20"
          >
            <GiDiceTarget />
            d20
          </button>
          <button
            className="session-actions__dice-button"
            onClick={rollD6}
            disabled={!isRunning}
            title="Roll d6"
          >
            <FaDiceD6 />
            d6
          </button>
          {diceResult && (
            <div className="session-actions__dice-result">
              {diceResult}
            </div>
          )}
        </div>
      </div>

      <div className="session-actions__section">
        <h4 className="session-actions__title">Quick Actions</h4>
        <div className="session-actions__grid">
          {quickActions.map(action => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className={`session-actions__action session-actions__action--${action.color}`}
                onClick={() => addQuickEvent(action.type, action.content)}
                disabled={!isRunning}
                title={action.label}
              >
                <IconComponent className="session-actions__action-icon" />
                <span className="session-actions__action-label">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SessionActions;
