import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent } from './atomic/Card';
import { BookOpen } from './atomic/Icons';
import type { Session } from '@/types/campaigns';
import './UpcomingSessions.css';

export interface UpcomingSessionsProps {
  sessions: Session[];
  className?: string;
}

export const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ 
  sessions, 
  className = '' 
}) => {
  const navigate = useNavigate();

  if (sessions.length === 0) {
    return null;
  }

  const handleSessionClick = (session: Session) => {
    navigate(`/campaigns/${session.campaignId}/sessions/${session.id}`);
  };

  return (
    <Card className={`upcoming-sessions ${className}`} variant="elevated">
      <CardHeader>
        <CardTitle>
          <BookOpen className="card__title-icon card__title-icon--success" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="card__content--space-y-3">
        {sessions.map((session) => (
          <button
            key={session.id}
            className="session-item"
            onClick={() => handleSessionClick(session)}
            type="button"
          >
            <h4 className="session-item__title">{session.title}</h4>
            <p className="session-item__meta">
              {new Date(session.date).toLocaleDateString()} • {session.duration}min
            </p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
