import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/NewLocation.css";
import {
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
  FaImage,
  FaMap,
  FaPlus,
  FaMinus
} from "react-icons/fa";

const NewLocation = () => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const { campaigns, createLocation } = useCampaigns();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "town" as const,
    description: "",
    history: "",
    inhabitants: [""],
    secrets: "",
    mapUrl: "",
    imageUrl: "",
    campaignId: campaignId || campaigns[0]?.id || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationTypes = [
    { value: "city", label: "City", icon: "🏛️" },
    { value: "town", label: "Town", icon: "🏘️" },
    { value: "village", label: "Village", icon: "🏡" },
    { value: "dungeon", label: "Dungeon", icon: "🏰" },
    { value: "wilderness", label: "Wilderness", icon: "🌲" },
    { value: "landmark", label: "Landmark", icon: "⛰️" },
    { value: "building", label: "Building", icon: "🏢" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Location name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.campaignId) {
      newErrors.campaignId = "Campaign selection is required";
    }

    const validInhabitants = formData.inhabitants.filter(inhabitant => inhabitant.trim());
    if (validInhabitants.length === 0) {
      newErrors.inhabitants = "At least one inhabitant is required";
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
      const locationData = {
        ...formData,
        inhabitants: formData.inhabitants.filter(inhabitant => inhabitant.trim()),
      };

      const newLocation = createLocation(locationData);
      navigate(`/locations/${newLocation.id}`);
    } catch (error) {
      console.error("Error creating location:", error);
      setErrors({ submit: "Failed to create location. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleInhabitantChange = (index: number, value: string) => {
    const newInhabitants = [...formData.inhabitants];
    newInhabitants[index] = value;
    setFormData(prev => ({ ...prev, inhabitants: newInhabitants }));
    if (errors.inhabitants) {
      setErrors(prev => ({ ...prev, inhabitants: "" }));
    }
  };

  const addInhabitant = () => {
    setFormData(prev => ({
      ...prev,
      inhabitants: [...prev.inhabitants, ""]
    }));
  };

  const removeInhabitant = (index: number) => {
    if (formData.inhabitants.length > 1) {
      const newInhabitants = formData.inhabitants.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, inhabitants: newInhabitants }));
    }
  };

  return (
    <div className="page-container">
      <div className="new-location">
        <div className="new-location__header">
          <div className="new-location__header-content">
            <h1 className="new-location__title">Create New Location</h1>
            <p className="new-location__description">
              Add a new location to your campaign world
            </p>
          </div>
          <button
            type="button"
            className="new-location__cancel-btn"
            onClick={() => navigate(-1)}
          >
            <FaTimes className="new-location__cancel-icon" />
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="new-location__form">
          {errors.submit && (
            <div className="new-location__error new-location__error--submit">
              {errors.submit}
            </div>
          )}

          <div className="new-location__form-section">
            <h2 className="new-location__section-title">Basic Information</h2>
            
            <div className="new-location__form-row">
              <div className="new-location__form-group">
                <label htmlFor="name" className="new-location__label">
                  <FaMapMarkerAlt className="new-location__label-icon" />
                  Location Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`new-location__input ${errors.name ? "new-location__input--error" : ""}`}
                  placeholder="Enter location name..."
                />
                {errors.name && (
                  <span className="new-location__error">{errors.name}</span>
                )}
              </div>

              <div className="new-location__form-group">
                <label htmlFor="campaign" className="new-location__label">
                  Campaign *
                </label>
                <select
                  id="campaign"
                  value={formData.campaignId}
                  onChange={(e) => handleInputChange("campaignId", e.target.value)}
                  className={`new-location__select ${errors.campaignId ? "new-location__select--error" : ""}`}
                  disabled={!!campaignId}
                >
                  <option value="">Select a campaign...</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
                {errors.campaignId && (
                  <span className="new-location__error">{errors.campaignId}</span>
                )}
              </div>
            </div>

            <div className="new-location__form-group">
              <fieldset className="new-location__fieldset">
                <legend className="new-location__label">Location Type *</legend>
                <div className="new-location__type-grid">
                  {locationTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`new-location__type-btn ${
                        formData.type === type.value ? "new-location__type-btn--active" : ""
                      }`}
                      onClick={() => handleInputChange("type", type.value)}
                    >
                      <span className="new-location__type-icon">{type.icon}</span>
                      <span className="new-location__type-label">{type.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="new-location__form-group">
              <label htmlFor="description" className="new-location__label">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`new-location__textarea ${errors.description ? "new-location__textarea--error" : ""}`}
                placeholder="Describe the location, its appearance, atmosphere, and notable features..."
                rows={4}
              />
              {errors.description && (
                <span className="new-location__error">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="new-location__form-section">
            <h2 className="new-location__section-title">Details</h2>

            <div className="new-location__form-group">
              <label htmlFor="history" className="new-location__label">
                History
              </label>
              <textarea
                id="history"
                value={formData.history}
                onChange={(e) => handleInputChange("history", e.target.value)}
                className="new-location__textarea"
                placeholder="Describe the location's history, how it was founded, significant events..."
                rows={3}
              />
            </div>

            <div className="new-location__form-group">
              <label className="new-location__label">
                <FaUsers className="new-location__label-icon" />
                Inhabitants *
              </label>
              <div className="new-location__inhabitants">
                {formData.inhabitants.map((inhabitant, index) => (
                  <div key={`inhabitant-${index}-${inhabitant}`} className="new-location__inhabitant-row">
                    <input
                      type="text"
                      value={inhabitant}
                      onChange={(e) => handleInhabitantChange(index, e.target.value)}
                      className="new-location__input"
                      placeholder="Enter inhabitant name or type..."
                    />
                    <button
                      type="button"
                      className="new-location__inhabitant-btn new-location__inhabitant-btn--remove"
                      onClick={() => removeInhabitant(index)}
                      disabled={formData.inhabitants.length === 1}
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="new-location__inhabitant-btn new-location__inhabitant-btn--add"
                  onClick={addInhabitant}
                >
                  <FaPlus className="new-location__add-icon" />
                  Add Inhabitant
                </button>
              </div>
              {errors.inhabitants && (
                <span className="new-location__error">{errors.inhabitants}</span>
              )}
            </div>

            <div className="new-location__form-group">
              <label htmlFor="secrets" className="new-location__label">
                <FaEye className="new-location__label-icon" />
                Secrets
              </label>
              <textarea
                id="secrets"
                value={formData.secrets}
                onChange={(e) => handleInputChange("secrets", e.target.value)}
                className="new-location__textarea"
                placeholder="Hidden secrets, mysteries, or plot hooks related to this location..."
                rows={3}
              />
            </div>
          </div>

          <div className="new-location__form-section">
            <h2 className="new-location__section-title">Media</h2>

            <div className="new-location__form-row">
              <div className="new-location__form-group">
                <label htmlFor="imageUrl" className="new-location__label">
                  <FaImage className="new-location__label-icon" />
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  className="new-location__input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="new-location__form-group">
                <label htmlFor="mapUrl" className="new-location__label">
                  <FaMap className="new-location__label-icon" />
                  Map URL
                </label>
                <input
                  type="url"
                  id="mapUrl"
                  value={formData.mapUrl}
                  onChange={(e) => handleInputChange("mapUrl", e.target.value)}
                  className="new-location__input"
                  placeholder="https://example.com/map.jpg"
                />
              </div>
            </div>

            {(formData.imageUrl || formData.mapUrl) && (
              <div className="new-location__preview">
                <h3 className="new-location__preview-title">Preview</h3>
                <div className="new-location__preview-grid">
                  {formData.imageUrl && (
                    <div className="new-location__preview-item">
                      <p className="new-location__preview-label">Image</p>
                      <img
                        src={formData.imageUrl}
                        alt="Location preview"
                        className="new-location__preview-img"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  {formData.mapUrl && (
                    <div className="new-location__preview-item">
                      <p className="new-location__preview-label">Map</p>
                      <img
                        src={formData.mapUrl}
                        alt="Map preview"
                        className="new-location__preview-img"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="new-location__form-actions">
            <button
              type="button"
              className="new-location__action-btn new-location__action-btn--cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="new-location__action-btn new-location__action-btn--save"
              disabled={isSubmitting}
            >
              <FaSave className="new-location__action-icon" />
              {isSubmitting ? "Creating..." : "Create Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLocation;
