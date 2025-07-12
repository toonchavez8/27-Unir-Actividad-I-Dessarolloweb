import { useState, useMemo } from "react";
import { 
  FaClock, 
  FaStickyNote, 
  FaTheaterMasks, 
  FaMapMarkerAlt, 
  FaCalendarDay,
  FaFilter,
  FaSearch
} from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import type { SessionEvent } from "@/types/session";
import "./SessionTimeline.css";

interface SessionTimelineProps {
  readonly sessionEvents: SessionEvent[];
  readonly formatTime: (seconds: number) => string;
}

export function SessionTimeline({ sessionEvents, formatTime }: SessionTimelineProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<SessionEvent["type"] | "all">("all");

  const eventTypeConfig = {
    note: { icon: FaStickyNote, color: "blue", label: "Note" },
    combat: { icon: GiCrossedSwords, color: "red", label: "Combat" },
    roleplay: { icon: FaTheaterMasks, color: "purple", label: "Roleplay" },
    event: { icon: FaCalendarDay, color: "green", label: "Event" },
    "location-change": { icon: FaMapMarkerAlt, color: "orange", label: "Location" },
  };

  const filteredEvents = useMemo(() => {
    return sessionEvents
      .filter(event => {
        const matchesSearch = event.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.npcs?.some(npc => npc.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterType === "all" || event.type === filterType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  }, [sessionEvents, searchTerm, filterType]);

  const eventCounts = useMemo(() => {
    return sessionEvents.reduce((counts, event) => {
      counts[event.type] = (counts[event.type] || 0) + 1;
      return counts;
    }, {} as Record<SessionEvent["type"], number>);
  }, [sessionEvents]);

  return (
    <div className="session-timeline">
      <div className="session-timeline__header">
        <div className="session-timeline__title-section">
          <h2 className="session-timeline__title">Session Timeline</h2>
          <span className="session-timeline__count">
            {filteredEvents.length} of {sessionEvents.length} events
          </span>
        </div>

        <div className="session-timeline__stats">
          {Object.entries(eventCounts).map(([type, count]) => {
            const config = eventTypeConfig[type as SessionEvent["type"]];
            if (!config) return null;
            
            const IconComponent = config.icon;
            return (
              <div key={type} className="session-timeline__stat">
                <IconComponent className={`session-timeline__stat-icon session-timeline__stat-icon--${config.color}`} />
                <span className="session-timeline__stat-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="session-timeline__controls">
        <div className="session-timeline__search">
          <FaSearch className="session-timeline__search-icon" />
          <input
            type="text"
            className="session-timeline__search-input"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="session-timeline__filter">
          <FaFilter className="session-timeline__filter-icon" />
          <select
            className="session-timeline__filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as SessionEvent["type"] | "all")}
          >
            <option value="all">All Events</option>
            <option value="note">Notes</option>
            <option value="combat">Combat</option>
            <option value="roleplay">Roleplay</option>
            <option value="event">Events</option>
            <option value="location-change">Location Changes</option>
          </select>
        </div>
      </div>

      <div className="session-timeline__content">
        {filteredEvents.length === 0 ? (
          <div className="session-timeline__empty">
            {sessionEvents.length === 0 ? (
              <>
                <FaClock className="session-timeline__empty-icon" />
                <h3 className="session-timeline__empty-title">No Events Yet</h3>
                <p className="session-timeline__empty-message">
                  Start your session to begin tracking events
                </p>
              </>
            ) : (
              <>
                <FaSearch className="session-timeline__empty-icon" />
                <h3 className="session-timeline__empty-title">No Matching Events</h3>
                <p className="session-timeline__empty-message">
                  Try adjusting your search or filter criteria
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="session-timeline__events">
            {filteredEvents.map((event, index) => {
              const config = eventTypeConfig[event.type];
              const IconComponent = config?.icon || FaCalendarDay;
              const isRecent = index < 3;

              return (
                <div
                  key={event.id}
                  className={`session-timeline__event ${
                    isRecent ? "session-timeline__event--recent" : ""
                  }`}
                >
                  <div className="session-timeline__event-header">
                    <div className="session-timeline__event-meta">
                      <div className={`session-timeline__event-icon session-timeline__event-icon--${config?.color}`}>
                        <IconComponent />
                      </div>
                      <div className="session-timeline__event-info">
                        <span className="session-timeline__event-type">
                          {config?.label || event.type}
                        </span>
                        <span className="session-timeline__event-time">
                          <FaClock className="session-timeline__time-icon" />
                          {formatTime(event.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {isRecent && (
                      <span className="session-timeline__event-badge">Recent</span>
                    )}
                  </div>

                  <div className="session-timeline__event-content">
                    <p className="session-timeline__event-text">{event.content}</p>
                    
                    {(event.location || event.npcs?.length) && (
                      <div className="session-timeline__event-details">
                        {event.location && (
                          <div className="session-timeline__event-detail">
                            <FaMapMarkerAlt className="session-timeline__detail-icon" />
                            <span className="session-timeline__detail-text">{event.location}</span>
                          </div>
                        )}
                        {event.npcs && event.npcs.length > 0 && (
                          <div className="session-timeline__event-detail">
                            <FaTheaterMasks className="session-timeline__detail-icon" />
                            <span className="session-timeline__detail-text">
                              {event.npcs.length === 1 ? "1 NPC" : `${event.npcs.length} NPCs`}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <div className="session-timeline__event-metadata">
                        {Object.entries(event.metadata).map(([key, value]) => (
                          <span key={key} className="session-timeline__metadata-item">
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionTimeline;
