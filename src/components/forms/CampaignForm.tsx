import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaUsers, FaSave } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./CampaignForm.css";

interface CampaignFormProps {
  readonly campaignId?: string;
}

export function CampaignForm({ campaignId }: CampaignFormProps) {
  const navigate = useNavigate();
  const { createCampaign, updateCampaign, getCampaignById, loading } = useCampaigns();
  
  const existingCampaign = campaignId ? getCampaignById(campaignId) : null;
  const isEditing = !!campaignId;

  const [formData, setFormData] = useState({
    title: existingCampaign?.title || "",
    description: existingCampaign?.description || "",
    worldName: existingCampaign?.worldName || "",
    status: existingCampaign?.status || "planning",
    notes: existingCampaign?.notes || "",
    imageUrl: existingCampaign?.imageUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when existingCampaign changes
  useEffect(() => {
    if (existingCampaign) {
      setFormData({
        title: existingCampaign.title,
        description: existingCampaign.description,
        worldName: existingCampaign.worldName,
        status: existingCampaign.status,
        notes: existingCampaign.notes,
        imageUrl: existingCampaign.imageUrl || "",
      });
    }
  }, [existingCampaign]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Campaign title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.worldName.trim()) {
      newErrors.worldName = "World name is required";
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
      const campaignData = {
        ...formData,
        sessions: existingCampaign?.sessions || [],
        npcs: existingCampaign?.npcs || [],
        locations: existingCampaign?.locations || [],
      };

      if (isEditing && campaignId) {
        updateCampaign(campaignId, campaignData);
        navigate(`/campaigns/${campaignId}`);
      } else {
        const newCampaign = createCampaign(campaignData);
        navigate(`/campaigns/${newCampaign.id}`);
      }
    } catch (error) {
      console.error("Failed to save campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const generateRandomImage = () => {
    const images = [
      "https://images.pexels.com/photos/3568521/pexels-photo-3568521.jpeg",
      "https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg",
      "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
      "https://images.pexels.com/photos/2424936/pexels-photo-2424936.jpeg",
      "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    handleInputChange("imageUrl", randomImage);
  };

  // If we're editing and data is still loading, show a loading state
  if (isEditing && loading && !existingCampaign) {
    return (
      <div className="campaign-form page-container">
        <div className="campaign-form__loading">
          <div className="campaign-form__loading-title"></div>
          <div className="campaign-form__loading-description"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="campaign-form page-container">
      <header className="campaign-form__header">
        <button
          className="campaign-form__back-button"
          onClick={() => navigate("/campaigns")}
          type="button"
        >
          <FaArrowLeft className="campaign-form__back-icon" />
          Back to Campaigns
        </button>
        
        <div className="campaign-form__title-section">
          <h1 className="campaign-form__title">
            {isEditing ? "Edit Campaign" : "Create New Campaign"}
          </h1>
          <p className="campaign-form__description">
            {isEditing ? "Update your campaign details" : "Start planning your next adventure"}
          </p>
        </div>
      </header>

      <form className="campaign-form__form" onSubmit={handleSubmit}>
        <div className="campaign-form__grid">
          <div className="campaign-form__main">
            <section className="campaign-form__card">
              <header className="campaign-form__card-header">
                <h2 className="campaign-form__card-title">
                  <FaUsers className="campaign-form__card-icon" />
                  Basic Information
                </h2>
              </header>
              
              <div className="campaign-form__card-content">
                <div className="campaign-form__field">
                  <label htmlFor="title" className="campaign-form__label">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`campaign-form__input ${errors.title ? "campaign-form__input--error" : ""}`}
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter campaign title..."
                    required
                  />
                  {errors.title && (
                    <span className="campaign-form__error">{errors.title}</span>
                  )}
                </div>

                <div className="campaign-form__field-group">
                  <div className="campaign-form__field">
                    <label htmlFor="worldName" className="campaign-form__label">
                      World Name *
                    </label>
                    <input
                      type="text"
                      id="worldName"
                      className={`campaign-form__input ${errors.worldName ? "campaign-form__input--error" : ""}`}
                      value={formData.worldName}
                      onChange={(e) => handleInputChange("worldName", e.target.value)}
                      placeholder="Enter world name..."
                      required
                    />
                    {errors.worldName && (
                      <span className="campaign-form__error">{errors.worldName}</span>
                    )}
                  </div>

                  <div className="campaign-form__field">
                    <label htmlFor="status" className="campaign-form__label">
                      Status
                    </label>
                    <select
                      id="status"
                      className="campaign-form__select"
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="campaign-form__field">
                  <label htmlFor="description" className="campaign-form__label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    className={`campaign-form__textarea ${errors.description ? "campaign-form__textarea--error" : ""}`}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your campaign setting, theme, and main story..."
                    rows={4}
                    required
                  />
                  {errors.description && (
                    <span className="campaign-form__error">{errors.description}</span>
                  )}
                </div>

                <div className="campaign-form__field">
                  <label htmlFor="notes" className="campaign-form__label">
                    Campaign Notes
                  </label>
                  <textarea
                    id="notes"
                    className="campaign-form__textarea"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add any additional notes, plot hooks, or important details..."
                    rows={5}
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="campaign-form__sidebar">
            <section className="campaign-form__card">
              <header className="campaign-form__card-header">
                <h2 className="campaign-form__card-title">Campaign Image</h2>
              </header>
              
              <div className="campaign-form__card-content">
                <div className="campaign-form__field">
                  <label htmlFor="imageUrl" className="campaign-form__label">
                    Image URL
                  </label>
                  <div className="campaign-form__image-input-group">
                    <input
                      type="url"
                      id="imageUrl"
                      className="campaign-form__input"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                      placeholder="Enter image URL..."
                    />
                    <button
                      type="button"
                      onClick={generateRandomImage}
                      className="campaign-form__random-button"
                      title="Generate random image"
                    >
                      <FaWandMagicSparkles className="campaign-form__random-icon" />
                    </button>
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="campaign-form__image-preview">
                    <img
                      src={formData.imageUrl}
                      alt="Campaign preview"
                      className="campaign-form__preview-img"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/3568521/pexels-photo-3568521.jpeg";
                      }}
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="campaign-form__card">
              <div className="campaign-form__card-content">
                <div className="campaign-form__submit-container">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="campaign-form__submit-button"
                  >
                    <FaSave className="campaign-form__submit-icon" />
                    {(() => {
                      if (isSubmitting) return "Saving...";
                      return isEditing ? "Update Campaign" : "Create Campaign";
                    })()}
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default CampaignForm;
