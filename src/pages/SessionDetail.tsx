import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atomic/Card';
import { BookOpen } from '@/components/atomic/Icons';
import '@/css/SessionDetail.css';

const SessionDetail: React.FC = () => {
  const { campaignId, sessionId } = useParams<{ campaignId: string; sessionId: string }>();
  const navigate = useNavigate();
  const { getSessionById, getCampaignById } = useCampaigns();

  const session = sessionId ? getSessionById(sessionId) : null;
  const campaign = campaignId ? getCampaignById(campaignId) : null;

  if (!session) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Session Not Found</h1>
          <p className="page-description">
            The session you're looking for doesn't exist.
          </p>
        </div>
        <div className="session-detail__actions">
          <button 
            className="btn btn--secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <Link to="/sessions" className="btn btn--primary">
            View All Sessions
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'planned': return 'info';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="session-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Dashboard</Link>
          <span className="breadcrumb-separator">→</span>
          {campaign && (
            <>
              <Link to="/campaigns" className="breadcrumb-link">Campaigns</Link>
              <span className="breadcrumb-separator">→</span>
              <Link to={`/campaigns/${campaign.id}`} className="breadcrumb-link">
                {campaign.title}
              </Link>
              <span className="breadcrumb-separator">→</span>
            </>
          )}
          <Link to="/sessions" className="breadcrumb-link">Sessions</Link>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">{session.title}</span>
        </div>
        
        <h1 className="page-title">{session.title}</h1>
        <p className="page-description">
          {campaign ? `Part of ${campaign.title} campaign` : 'Session Details'}
        </p>
      </div>

      <div className="session-detail__grid">
        {/* Session Overview */}
        <Card className="session-detail__overview" variant="elevated">
          <CardHeader>
            <CardTitle>
              <BookOpen className="card__title-icon card__title-icon--primary" />
              Session Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="session-detail__meta">
              <div className="session-meta-item">
                <span className="session-meta-label">Date & Time:</span>
                <span className="session-meta-value">{formatDate(session.date)}</span>
              </div>
              <div className="session-meta-item">
                <span className="session-meta-label">Duration:</span>
                <span className="session-meta-value">{session.duration} minutes</span>
              </div>
              <div className="session-meta-item">
                <span className="session-meta-label">Status:</span>
                <span className={`session-status session-status--${getStatusColor(session.status)}`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
              </div>
            </div>
            
            {session.description && (
              <div className="session-detail__description">
                <h4>Description</h4>
                <p>{session.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Session Summary */}
        {session.summary && (
          <Card className="session-detail__summary" variant="elevated">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{session.summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Session Events */}
        {session.events && session.events.length > 0 && (
          <Card className="session-detail__events" variant="elevated">
            <CardHeader>
              <CardTitle>Key Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="session-events">
                {session.events.map((event) => (
                  <div key={event.id} className="session-event">
                    <div className="session-event__header">
                      <h4 className="session-event__title">{event.title}</h4>
                      <span className={`session-event__type session-event__type--${event.type}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="session-event__description">{event.description}</p>
                    {event.timestamp && (
                      <span className="session-event__timestamp">{event.timestamp}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Session Notes */}
        {session.notes && (
          <Card className="session-detail__notes" variant="elevated">
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="session-notes">
                <pre className="session-notes__content">{session.notes}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Buttons */}
      <div className="session-detail__actions">
        <button 
          className="btn btn--secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <Link to={`/sessions/${session.id}/edit`} className="btn btn--primary">
          Edit Session
        </Link>
        {campaign && (
          <Link to={`/campaigns/${campaign.id}`} className="btn btn--outline">
            View Campaign
          </Link>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;
