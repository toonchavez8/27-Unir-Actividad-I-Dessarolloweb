import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave, FaCalendarAlt } from "react-icons/fa";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./SessionForm.css";

interface SessionFormProps {
  readonly sessionId?: string;
  readonly campaignId?: string;
}

export function SessionForm({ sessionId, campaignId }: SessionFormProps) {
  const navigate = useNavigate();
  const { campaigns, createSession, updateSession, getSessionById, loading } = useCampaigns();
  
  const existingSession = sessionId ? getSessionById(sessionId) : null;
  const isEditing = !!sessionId;

  const [formData, setFormData] = useState({
    campaignId: existingSession?.campaignId || campaignId || "",
    title: existingSession?.title || "",
    description: existingSession?.description || "",
    date: existingSession?.date ? existingSession.date.toISOString().split('T')[0] : "",
    duration: existingSession?.duration || 180,
    summary: existingSession?.summary || "",
    notes: existingSession?.notes || "",
    status: existingSession?.status || "planned",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when existingSession changes
  useEffect(() => {
    if (existingSession) {
      setFormData({
        campaignId: existingSession.campaignId,
        title: existingSession.title,
        description: existingSession.description,
        date: existingSession.date.toISOString().split('T')[0],
        duration: existingSession.duration,
        summary: existingSession.summary,
        notes: existingSession.notes,
        status: existingSession.status,
      });
    } else if (campaignId) {
      // Reset form for new session with campaign pre-selected
      setFormData({
        campaignId,
        title: "",
        description: "",
        date: "",
        duration: 180,
        summary: "",
        notes: "",
        status: "planned",
      });
    }
  }, [existingSession, campaignId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Session title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.campaignId) {
      newErrors.campaignId = "Campaign is required";
    }
    if (formData.duration < 30) {
      newErrors.duration = "Duration must be at least 30 minutes";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const sessionData = {
        ...formData,
        date: formData.date ? new Date(formData.date) : new Date(),
        events: existingSession?.events || [],
      };

      if (isEditing && sessionId) {
        updateSession(sessionId, sessionData);
        navigate(`/campaigns/${formData.campaignId}/sessions/${sessionId}`);
      } else {
        const newSession = createSession(sessionData);
        navigate(`/campaigns/${formData.campaignId}/sessions/${newSession.id}`);
      }
    } catch (error) {
      console.error("Failed to save session:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  // If we're editing and data is still loading, show a loading state
  if (isEditing && loading && !existingSession) {
    return (
      <div className="session-form page-container">
        <div className="session-form__loading">
          <div className="session-form__loading-title"></div>
          <div className="session-form__loading-description"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="session-form page-container">
      <header className="session-form__header">
        <button
          className="session-form__back-button"
          onClick={() => navigate("/sessions")}
          type="button"
        >
          <FaArrowLeft className="session-form__back-icon" />
          Back to Sessions
        </button>
        
        <div className="session-form__title-section">
          <h1 className="session-form__title">
            {isEditing ? "Edit Session" : "Plan New Session"}
          </h1>
          <p className="session-form__description">
            {isEditing ? "Update session details" : "Create a new session for your campaign"}
          </p>
        </div>
      </header>

      <form className="session-form__form" onSubmit={handleSubmit}>
        <div className="session-form__grid">
          <div className="session-form__main">
            <section className="session-form__card">
              <header className="session-form__card-header">
                <h2 className="session-form__card-title">
                  <FaCalendarAlt className="session-form__card-icon" />
                  Session Details
                </h2>
              </header>
              
              <div className="session-form__card-content">
                <div className="session-form__field">
                  <label htmlFor="campaignId" className="session-form__label">
                    Campaign *
                  </label>
                  <select
                    id="campaignId"
                    className={`session-form__select ${errors.campaignId ? "session-form__select--error" : ""}`}
                    value={formData.campaignId}
                    onChange={(e) => handleInputChange("campaignId", e.target.value)}
                    required
                  >
                    <option value="">Select a campaign</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.title}
                      </option>
                    ))}
                  </select>
                  {errors.campaignId && (
                    <span className="session-form__error">{errors.campaignId}</span>
                  )}
                </div>

                <div className="session-form__field">
                  <label htmlFor="title" className="session-form__label">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`session-form__input ${errors.title ? "session-form__input--error" : ""}`}
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter session title..."
                    required
                  />
                  {errors.title && (
                    <span className="session-form__error">{errors.title}</span>
                  )}
                </div>

                <div className="session-form__field-group">
                  <div className="session-form__field">
                    <label htmlFor="date" className="session-form__label">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="session-form__input"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>

                  <div className="session-form__field">
                    <label htmlFor="duration" className="session-form__label">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      className={`session-form__input ${errors.duration ? "session-form__input--error" : ""}`}
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                      min="30"
                      step="30"
                      placeholder="180"
                    />
                    {errors.duration && (
                      <span className="session-form__error">{errors.duration}</span>
                    )}
                  </div>
                </div>

                <div className="session-form__field">
                  <label htmlFor="status" className="session-form__label">
                    Status
                  </label>
                  <select
                    id="status"
                    className="session-form__select"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                  >
                    <option value="planned">Planned</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="session-form__field">
                  <label htmlFor="description" className="session-form__label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    className={`session-form__textarea ${errors.description ? "session-form__textarea--error" : ""}`}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe what happens in this session..."
                    rows={4}
                    required
                  />
                  {errors.description && (
                    <span className="session-form__error">{errors.description}</span>
                  )}
                </div>
              </div>
            </section>

            <section className="session-form__card">
              <header className="session-form__card-header">
                <h2 className="session-form__card-title">Session Notes</h2>
              </header>
              
              <div className="session-form__card-content">
                <div className="session-form__field">
                  <label htmlFor="summary" className="session-form__label">
                    Session Summary
                  </label>
                  <textarea
                    id="summary"
                    className="session-form__textarea"
                    value={formData.summary}
                    onChange={(e) => handleInputChange("summary", e.target.value)}
                    placeholder="Summarize what happened in this session..."
                    rows={4}
                  />
                </div>

                <div className="session-form__field">
                  <label htmlFor="notes" className="session-form__label">
                    DM Notes
                  </label>
                  <textarea
                    id="notes"
                    className="session-form__textarea"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add notes for future reference..."
                    rows={5}
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="session-form__sidebar">
            <section className="session-form__card">
              <div className="session-form__card-content">
                <div className="session-form__submit-container">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="session-form__submit-button"
                  >
                    <FaSave className="session-form__submit-icon" />
                    {(() => {
                      if (isSubmitting) return "Saving...";
                      return isEditing ? "Update Session" : "Create Session";
                    })()}
                  </button>
                </div>
              </div>
            </section>

            {isEditing && existingSession && (
              <section className="session-form__card">
                <header className="session-form__card-header">
                  <h2 className="session-form__card-title">Current Campaign</h2>
                </header>
                <div className="session-form__card-content">
                  <p className="session-form__campaign-info">
                    {getCampaignTitle(existingSession.campaignId)}
                  </p>
                </div>
              </section>
            )}
          </aside>
        </div>
      </form>
    </div>
  );
}

export default SessionForm;
