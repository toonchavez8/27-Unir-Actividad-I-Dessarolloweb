import type { NavigateFunction } from "react-router";
import type { Session } from "@/types/campaigns";

export interface SessionsListProps {
  readonly sessions: Session[];
  readonly title: string;
  readonly campaignId: string;
  readonly navigate: NavigateFunction;
  readonly showStatus?: boolean;
}

export function SessionsList({
  sessions,
  title,
  campaignId,
  navigate,
  showStatus = false,
}: SessionsListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (sessions.length === 0) {
    return null;
  }

  return (
    <section className="campaign-detail__section">
      <h2 className="campaign-detail__section-title">{title}</h2>
      <div className="campaign-detail__sessions-grid">
        {sessions.map((session) => (
          <button
            key={session.id}
            className="campaign-detail__session-card"
            onClick={() =>
              navigate(`/campaigns/${campaignId}/sessions/${session.id}`)
            }
          >
            <h3 className="campaign-detail__session-title">{session.title}</h3>
            <p className="campaign-detail__session-date">
              {formatDate(session.date)}
            </p>
            <p className="campaign-detail__session-description">
              {session.description}
            </p>
            {showStatus && (
              <span
                className={`campaign-detail__session-status campaign-detail__session-status--${session.status}`}
              >
                {session.status}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
