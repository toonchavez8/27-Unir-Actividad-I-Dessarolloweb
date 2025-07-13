import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router';
import { useCampaigns } from '@/hooks/useCampaigns';
import type { Session } from '@/types/campaigns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atomic/Card';
import { BookOpen } from '@/components/atomic/Icons';
import { 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaTrash, 
  FaArrowLeft,
  FaCalendar,
  FaClock
} from 'react-icons/fa';
import '@/css/SessionDetail.css';

const SessionDetail: React.FC = () => {
  const { campaignId, sessionId } = useParams<{ campaignId: string; sessionId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getSessionById, getCampaignById, updateSession, deleteSession } = useCampaigns();

  // Check if we're in edit mode (from URL param or state)
  const isEditMode = searchParams.get('edit') === 'true';
  
  // State for editing
  const [isEditing, setIsEditing] = useState(isEditMode);
  const [formData, setFormData] = useState<Session | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const session = sessionId ? getSessionById(sessionId) : null;
  const campaign = campaignId ? getCampaignById(campaignId) : null;

  // Initialize form data when session is loaded
  useEffect(() => {
    if (session) {
      setFormData(session);
    }
  }, [session]);

  // Edit mode functions
  const validateForm = () => {
    if (!formData) return false;
    
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Session title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!formData || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      updateSession(formData.id, formData);
      setIsEditing(false);
      setErrors({});
      // Remove edit parameter from URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('edit');
      navigate({
        pathname: window.location.pathname,
        search: newSearchParams.toString()
      }, { replace: true });
    } catch (error) {
      console.error("Error updating session:", error);
      setErrors({ submit: "Failed to update session. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (session) {
      setFormData(session);
    }
    setIsEditing(false);
    setErrors({});
    // Remove edit parameter from URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('edit');
    navigate({
      pathname: window.location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  };

  const handleDelete = () => {
    if (session) {
      deleteSession(session.id);
      navigate("/sessions");
    }
  };

  const handleInputChange = (field: keyof Session, value: string | Date | number) => {
    if (!formData) return;
    
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Add edit parameter to URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('edit', 'true');
      navigate({
        pathname: window.location.pathname,
        search: newSearchParams.toString()
      }, { replace: true });
    }
  };

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
      {/* Header with Back Button and Breadcrumb */}
      <div className="session-detail__header">
        <div className="session-detail__header-nav">
          <button
            className="session-detail__back-btn"
            onClick={() => navigate("/sessions")}
          >
            <FaArrowLeft className="session-detail__back-icon" />
            Back to Sessions
          </button>
          
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
            <span className="breadcrumb-current">
              {isEditing ? (formData?.title || session.title) : session.title}
            </span>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="session-detail__error session-detail__error--submit">
          {errors.submit}
        </div>
      )}

      <div className="page-header">        
        <div className="session-detail__title-section">
          {isEditing ? (
            <div className="session-detail__form-group">
              <label htmlFor="title" className="session-detail__label">
                Session Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData?.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`session-detail__input ${errors.title ? "session-detail__input--error" : ""}`}
                placeholder="Enter session title..."
              />
              {errors.title && (
                <span className="session-detail__error">{errors.title}</span>
              )}
            </div>
          ) : (
            <h1 className="page-title">{session.title}</h1>
          )}
          <p className="page-description">
            {campaign ? `Part of ${campaign.title} campaign` : 'Session Details'}
          </p>
        </div>
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
            {isEditing ? (
              <div className="session-detail__edit-form">
                <div className="session-detail__form-row">
                  <div className="session-detail__form-group">
                    <label htmlFor="date" className="session-detail__label">
                      <FaCalendar className="session-detail__label-icon" />
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      id="date"
                      value={formData?.date ? new Date(formData.date).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleInputChange("date", new Date(e.target.value))}
                      className="session-detail__input"
                    />
                  </div>
                  
                  <div className="session-detail__form-group">
                    <label htmlFor="duration" className="session-detail__label">
                      <FaClock className="session-detail__label-icon" />
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={formData?.duration || ""}
                      onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                      className="session-detail__input"
                      min="30"
                      step="30"
                    />
                  </div>
                </div>

                <div className="session-detail__form-group">
                  <label htmlFor="status" className="session-detail__label">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData?.status || ""}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="session-detail__select"
                  >
                    <option value="planned">Planned</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="session-detail__form-group">
                  <label htmlFor="description" className="session-detail__label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData?.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`session-detail__textarea ${errors.description ? "session-detail__textarea--error" : ""}`}
                    placeholder="Describe the session..."
                    rows={4}
                  />
                  {errors.description && (
                    <span className="session-detail__error">{errors.description}</span>
                  )}
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Session Summary */}
        {(session.summary || isEditing) && (
          <Card className="session-detail__summary" variant="elevated">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="session-detail__form-group">
                  <textarea
                    value={formData?.summary || ""}
                    onChange={(e) => handleInputChange("summary", e.target.value)}
                    className="session-detail__textarea"
                    placeholder="Add session summary..."
                    rows={4}
                  />
                </div>
              ) : (
                <p>{session.summary}</p>
              )}
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
        {(session.notes || isEditing) && (
          <Card className="session-detail__notes" variant="elevated">
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="session-detail__form-group">
                  <textarea
                    value={formData?.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="session-detail__textarea session-detail__textarea--notes"
                    placeholder="Add session notes..."
                    rows={6}
                  />
                </div>
              ) : (
                <div className="session-notes">
                  <pre className="session-notes__content">{session.notes}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {!isEditing ? (
          <div className="session-detail__actions">
            <button
              className="session-detail__action-btn session-detail__action-btn--edit"
              onClick={toggleEditMode}
            >
              <FaEdit className="session-detail__action-icon" />
              Edit
            </button>
            <button
              className="session-detail__action-btn session-detail__action-btn--delete"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <FaTrash className="session-detail__action-icon" />
              Delete
            </button>
          </div>
        ) : (
          <div className="session-detail__actions">
            <button
              className="session-detail__action-btn session-detail__action-btn--cancel"
              onClick={handleCancel}
            >
              <FaTimes className="session-detail__action-icon" />
              Cancel
            </button>
            <button
              className="session-detail__action-btn session-detail__action-btn--save"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              <FaSave className="session-detail__action-icon" />
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="session-detail__modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="session-detail__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="session-detail__modal-title">Delete Session</h3>
            <p className="session-detail__modal-text">
              Are you sure you want to delete "{session.title}"? This action cannot be undone.
            </p>
            <div className="session-detail__modal-actions">
              <button
                className="session-detail__modal-btn session-detail__modal-btn--cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="session-detail__modal-btn session-detail__modal-btn--delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetail;
