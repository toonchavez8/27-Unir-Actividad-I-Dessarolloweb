import { useState } from "react";
import { 
  FaStickyNote, 
  FaUsers, 
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaHeart,
  FaBolt
} from "react-icons/fa";
import { GiCrossedSwords, GiDiceTarget } from "react-icons/gi";
import type { NPC, Location } from "@/types/campaigns";
import type { SessionTab, InitiativeEntry, SessionEvent } from "@/types/session";
import { SessionActions } from "./SessionActions";
import "./SessionSidebar.css";

interface SessionSidebarProps {
  readonly activeTab: SessionTab;
  readonly onTabChange: (tab: SessionTab) => void;
  readonly campaignNPCs: NPC[];
  readonly campaignLocations: Location[];
  readonly currentLocation: string;
  readonly onLocationChange: (location: string) => void;
  readonly initiative: InitiativeEntry[];
  readonly onInitiativeChange: (initiative: InitiativeEntry[]) => void;
  readonly currentTurn: number;
  readonly onTurnChange: (turn: number) => void;
  readonly onAddEvent: (type: SessionEvent["type"], content: string, npcs?: string[], location?: string, metadata?: Record<string, unknown>) => void;
  readonly isRunning: boolean;
}

export function SessionSidebar({
  activeTab,
  onTabChange,
  campaignNPCs,
  campaignLocations,
  currentLocation,
  onLocationChange,
  initiative,
  onInitiativeChange,
  currentTurn,
  onTurnChange,
  onAddEvent,
  isRunning,
}: SessionSidebarProps) {
  const [noteText, setNoteText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newInitiativeName, setNewInitiativeName] = useState("");
  const [newInitiativeValue, setNewInitiativeValue] = useState("");

  const tabs = [
    { id: "notes" as SessionTab, label: "Notes", icon: FaStickyNote },
    { id: "npcs" as SessionTab, label: "NPCs", icon: FaUsers },
    { id: "combat" as SessionTab, label: "Combat", icon: GiCrossedSwords },
    { id: "locations" as SessionTab, label: "Locations", icon: FaMapMarkerAlt },
    { id: "actions" as SessionTab, label: "Actions", icon: FaBolt },
  ];

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddEvent("note", noteText.trim());
      setNoteText("");
    }
  };

  const handleAddToInitiative = () => {
    if (newInitiativeName.trim() && newInitiativeValue) {
      const newEntry: InitiativeEntry = {
        id: Date.now().toString(),
        name: newInitiativeName.trim(),
        initiative: parseInt(newInitiativeValue),
        isPC: false,
      };
      const updatedInitiative = [...initiative, newEntry].sort((a, b) => b.initiative - a.initiative);
      onInitiativeChange(updatedInitiative);
      setNewInitiativeName("");
      setNewInitiativeValue("");
    }
  };

  const handleRemoveFromInitiative = (id: string) => {
    const updatedInitiative = initiative.filter(entry => entry.id !== id);
    onInitiativeChange(updatedInitiative);
    if (currentTurn >= updatedInitiative.length) {
      onTurnChange(0);
    }
  };

  const handleNextTurn = () => {
    if (initiative.length > 0) {
      const nextTurn = (currentTurn + 1) % initiative.length;
      onTurnChange(nextTurn);
      const currentActor = initiative[nextTurn];
      onAddEvent("event", `Turn: ${currentActor.name}`, [], currentLocation, { turn: nextTurn });
    }
  };

  const filteredNPCs = campaignNPCs.filter(npc =>
    npc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    npc.race.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLocations = campaignLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="session-sidebar">
      <div className="session-sidebar__tabs">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`session-sidebar__tab ${
                activeTab === tab.id ? "session-sidebar__tab--active" : ""
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <IconComponent className="session-sidebar__tab-icon" />
              <span className="session-sidebar__tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="session-sidebar__content">
        {activeTab === "notes" && (
          <div className="session-sidebar__notes">
            <h3 className="session-sidebar__title">Session Notes</h3>
            <div className="session-sidebar__note-form">
              <textarea
                className="session-sidebar__note-input"
                placeholder="Add a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
              <button
                className="session-sidebar__note-button"
                onClick={handleAddNote}
                disabled={!noteText.trim()}
              >
                <FaPlus className="session-sidebar__note-button-icon" />
                Add Note
              </button>
            </div>
          </div>
        )}

        {activeTab === "npcs" && (
          <div className="session-sidebar__npcs">
            <div className="session-sidebar__header">
              <h3 className="session-sidebar__title">NPCs</h3>
              <div className="session-sidebar__search">
                <FaSearch className="session-sidebar__search-icon" />
                <input
                  type="text"
                  className="session-sidebar__search-input"
                  placeholder="Search NPCs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="session-sidebar__list">
              {filteredNPCs.map(npc => (
                <div key={npc.id} className="session-sidebar__npc-card">
                  <div className="session-sidebar__npc-info">
                    <h4 className="session-sidebar__npc-name">{npc.name}</h4>
                    <p className="session-sidebar__npc-details">
                      {npc.race} • {npc.class || "Unknown"}
                    </p>
                  </div>
                  <div className="session-sidebar__npc-actions">
                    <button
                      className="session-sidebar__npc-button"
                      onClick={() => onAddEvent("roleplay", `Interacted with ${npc.name}`, [npc.id])}
                      disabled={!isRunning}
                      title="Log interaction"
                    >
                      <FaUsers />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "combat" && (
          <div className="session-sidebar__combat">
            <h3 className="session-sidebar__title">Initiative Tracker</h3>
            
            <div className="session-sidebar__initiative-form">
              <div className="session-sidebar__initiative-inputs">
                <input
                  type="text"
                  className="session-sidebar__initiative-name"
                  placeholder="Character/Monster name"
                  value={newInitiativeName}
                  onChange={(e) => setNewInitiativeName(e.target.value)}
                />
                <input
                  type="number"
                  className="session-sidebar__initiative-value"
                  placeholder="Initiative"
                  value={newInitiativeValue}
                  onChange={(e) => setNewInitiativeValue(e.target.value)}
                />
              </div>
              <button
                className="session-sidebar__initiative-add"
                onClick={handleAddToInitiative}
                disabled={!newInitiativeName.trim() || !newInitiativeValue}
              >
                <FaPlus />
              </button>
            </div>

            {initiative.length > 0 && (
              <>
                <div className="session-sidebar__turn-controls">
                  <button
                    className="session-sidebar__next-turn"
                    onClick={handleNextTurn}
                    disabled={!isRunning}
                  >
                    <GiDiceTarget className="session-sidebar__next-turn-icon" />
                    Next Turn
                  </button>
                </div>

                <div className="session-sidebar__initiative-list">
                  {initiative.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`session-sidebar__initiative-entry ${
                        index === currentTurn ? "session-sidebar__initiative-entry--current" : ""
                      }`}
                    >
                      <div className="session-sidebar__initiative-info">
                        <div className="session-sidebar__initiative-name">{entry.name}</div>
                        <div className="session-sidebar__initiative-score">{entry.initiative}</div>
                      </div>
                      {entry.hp !== undefined && (
                        <div className="session-sidebar__initiative-hp">
                          <FaHeart className="session-sidebar__hp-icon" />
                          {entry.hp}/{entry.maxHp}
                        </div>
                      )}
                      <button
                        className="session-sidebar__initiative-remove"
                        onClick={() => handleRemoveFromInitiative(entry.id)}
                        title="Remove from initiative"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "locations" && (
          <div className="session-sidebar__locations">
            <div className="session-sidebar__header">
              <h3 className="session-sidebar__title">Locations</h3>
              <div className="session-sidebar__search">
                <FaSearch className="session-sidebar__search-icon" />
                <input
                  type="text"
                  className="session-sidebar__search-input"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {currentLocation && (
              <div className="session-sidebar__current-location">
                <FaMapMarkerAlt className="session-sidebar__location-icon" />
                <span className="session-sidebar__location-text">Current: {currentLocation}</span>
              </div>
            )}

            <div className="session-sidebar__list">
              {filteredLocations.map(location => (
                <div key={location.id} className="session-sidebar__location-card">
                  <div className="session-sidebar__location-info">
                    <h4 className="session-sidebar__location-name">{location.name}</h4>
                    <p className="session-sidebar__location-type">{location.type}</p>
                    {location.description && (
                      <p className="session-sidebar__location-description">
                        {location.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                  <div className="session-sidebar__location-actions">
                    <button
                      className="session-sidebar__location-button"
                      onClick={() => {
                        onLocationChange(location.name);
                        onAddEvent("location-change", `Moved to ${location.name}`, [], location.name);
                      }}
                      disabled={!isRunning}
                      title="Travel to location"
                    >
                      <FaMapMarkerAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div className="session-sidebar__actions">
            <SessionActions
              onAddEvent={onAddEvent}
              isRunning={isRunning}
              currentLocation={currentLocation}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionSidebar;
