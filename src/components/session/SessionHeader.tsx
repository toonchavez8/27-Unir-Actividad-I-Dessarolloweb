import { FaPlay, FaPause, FaStop, FaClock, FaCalendarAlt, FaUsers } from "react-icons/fa";
import type { Session, Campaign } from "@/types/campaigns";
import "./SessionHeader.css";

interface SessionHeaderProps {
  readonly session: Session;
  readonly campaign: Campaign;
  readonly sessionTime: number;
  readonly isRunning: boolean;
  readonly isPaused: boolean;
  readonly formatTime: (seconds: number) => string;
  readonly onStart: () => void;
  readonly onPause: () => void;
  readonly onEnd: () => void;
}

export function SessionHeader({
  session,
  campaign,
  sessionTime,
  isRunning,
  isPaused,
  formatTime,
  onStart,
  onPause,
  onEnd,
}: SessionHeaderProps) {
  const getStatusText = () => {
    if (!isRunning) return "Not Started";
    if (isPaused) return "Paused";
    return "Running";
  };

  const getStatusClass = () => {
    if (!isRunning) return "session-header__status--not-started";
    if (isPaused) return "session-header__status--paused";
    return "session-header__status--running";
  };

  return (
    <div className="session-header">
      <div className="session-header__main">
        <div className="session-header__info">
          <h1 className="session-header__title">{session.title}</h1>
          <div className="session-header__subtitle">
            <span className="session-header__campaign">{campaign.title}</span>
            <span className="session-header__separator">•</span>
            <span className="session-header__date">
              <FaCalendarAlt className="session-header__icon" />
              {new Date(session.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="session-header__status">
          <div className={`session-header__status-indicator ${getStatusClass()}`}>
            <span className="session-header__status-text">{getStatusText()}</span>
          </div>
          <div className="session-header__timer">
            <FaClock className="session-header__timer-icon" />
            <span className="session-header__timer-text">{formatTime(sessionTime)}</span>
          </div>
        </div>
      </div>

      <div className="session-header__controls">
        {!isRunning ? (
          <button
            className="session-header__button session-header__button--start"
            onClick={onStart}
            title="Start Session"
          >
            <FaPlay className="session-header__button-icon" />
            Start Session
          </button>
        ) : (
          <>
            <button
              className={`session-header__button session-header__button--pause ${
                isPaused ? "session-header__button--resume" : ""
              }`}
              onClick={onPause}
              title={isPaused ? "Resume Session" : "Pause Session"}
            >
              <FaPause className="session-header__button-icon" />
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              className="session-header__button session-header__button--end"
              onClick={onEnd}
              title="End Session"
            >
              <FaStop className="session-header__button-icon" />
              End Session
            </button>
          </>
        )}
      </div>

      <div className="session-header__meta">
        <div className="session-header__meta-item">
          <FaUsers className="session-header__meta-icon" />
          <span className="session-header__meta-text">Session #{session.id}</span>
        </div>
      </div>
    </div>
  );
}

export default SessionHeader;
