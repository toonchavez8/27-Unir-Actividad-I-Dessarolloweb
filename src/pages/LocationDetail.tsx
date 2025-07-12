import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import type { Location } from "@/types/campaigns";
import "../css/LocationDetail.css";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
  FaImage,
  FaMap,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaTrash
} from "react-icons/fa";

const LocationDetail = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const { getLocationById, updateLocation, deleteLocation, campaigns, loading: campaignsLoading } = useCampaigns();
  
  const [location, setLocation] = useState<Location | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Location | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const locationTypes = [
    { value: "city", label: "City", icon: "🏛️" },
    { value: "town", label: "Town", icon: "🏘️" },
    { value: "village", label: "Village", icon: "🏡" },
    { value: "dungeon", label: "Dungeon", icon: "🏰" },
    { value: "wilderness", label: "Wilderness", icon: "🌲" },
    { value: "landmark", label: "Landmark", icon: "⛰️" },
    { value: "building", label: "Building", icon: "🏢" },
  ];

  useEffect(() => {
    // Don't redirect if data is still loading
    if (campaignsLoading) {
      return;
    }
    
    if (locationId) {
      const foundLocation = getLocationById(locationId);
      if (foundLocation) {
        setLocation(foundLocation);
        setFormData(foundLocation);
      } else {
        navigate("/locations");
      }
    }
  }, [locationId, getLocationById, navigate, campaignsLoading]);

  const validateForm = () => {
    if (!formData) return false;
    
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Location name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    const validInhabitants = formData.inhabitants.filter(inhabitant => inhabitant.trim());
    if (validInhabitants.length === 0) {
      newErrors.inhabitants = "At least one inhabitant is required";
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
      const updatedData = {
        ...formData,
        inhabitants: formData.inhabitants.filter(inhabitant => inhabitant.trim()),
      };

      updateLocation(formData.id, updatedData);
      setLocation(updatedData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error("Error updating location:", error);
      setErrors({ submit: "Failed to update location. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(location);
    setIsEditing(false);
    setErrors({});
  };

  const handleDelete = () => {
    if (location) {
      deleteLocation(location.id);
      navigate("/locations");
    }
  };

  const handleInputChange = (field: keyof Location, value: string | string[]) => {
    if (!formData) return;
    
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleInhabitantChange = (index: number, value: string) => {
    if (!formData) return;
    
    const newInhabitants = [...formData.inhabitants];
    newInhabitants[index] = value;
    handleInputChange("inhabitants", newInhabitants);
  };

  const addInhabitant = () => {
    if (!formData) return;
    
    handleInputChange("inhabitants", [...formData.inhabitants, ""]);
  };

  const removeInhabitant = (index: number) => {
    if (!formData || formData.inhabitants.length <= 1) return;
    
    const newInhabitants = formData.inhabitants.filter((_, i) => i !== index);
    handleInputChange("inhabitants", newInhabitants);
  };

  const getCampaignTitle = (campaignId: string) => {
    return campaigns.find(c => c.id === campaignId)?.title || "Unknown Campaign";
  };

  const getTypeData = (type: string) => {
    return locationTypes.find(t => t.value === type) || locationTypes[0];
  };

  if (!location || !formData || campaignsLoading) {
    return (
      <div className="page-container">
        <div className="location-detail__loading">
          <div className="location-detail__loading-header"></div>
          <div className="location-detail__loading-content"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="location-detail">
        <div className="location-detail__header">
          <div className="location-detail__header-nav">
            <button
              className="location-detail__back-btn"
              onClick={() => navigate("/locations")}
            >
              <FaArrowLeft className="location-detail__back-icon" />
              Back to Locations
            </button>
          </div>
          
          <div className="location-detail__header-actions">
            {!isEditing ? (
              <>
                <button
                  className="location-detail__action-btn location-detail__action-btn--edit"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="location-detail__action-icon" />
                  Edit
                </button>
                <button
                  className="location-detail__action-btn location-detail__action-btn--delete"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <FaTrash className="location-detail__action-icon" />
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="location-detail__action-btn location-detail__action-btn--cancel"
                  onClick={handleCancel}
                >
                  <FaTimes className="location-detail__action-icon" />
                  Cancel
                </button>
                <button
                  className="location-detail__action-btn location-detail__action-btn--save"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  <FaSave className="location-detail__action-icon" />
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {errors.submit && (
          <div className="location-detail__error location-detail__error--submit">
            {errors.submit}
          </div>
        )}

        <div className="location-detail__content">
          <div className="location-detail__main">
            <div className="location-detail__title-section">
              {isEditing ? (
                <div className="location-detail__form-group">
                  <label htmlFor="name" className="location-detail__label">
                    <FaMapMarkerAlt className="location-detail__label-icon" />
                    Location Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`location-detail__input ${errors.name ? "location-detail__input--error" : ""}`}
                    placeholder="Enter location name..."
                  />
                  {errors.name && (
                    <span className="location-detail__error">{errors.name}</span>
                  )}
                </div>
              ) : (
                <h1 className="location-detail__title">{location.name}</h1>
              )}
              
              <div className="location-detail__meta">
                <div className="location-detail__campaign">
                  Campaign: {getCampaignTitle(location.campaignId)}
                </div>
                <div className="location-detail__type">
                  {isEditing ? (
                    <div className="location-detail__type-edit">
                      <fieldset className="location-detail__fieldset">
                        <legend className="location-detail__label">Location Type *</legend>
                        <div className="location-detail__type-grid">
                          {locationTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              className={`location-detail__type-btn ${
                                formData.type === type.value ? "location-detail__type-btn--active" : ""
                              }`}
                              onClick={() => handleInputChange("type", type.value)}
                            >
                              <span className="location-detail__type-icon">{type.icon}</span>
                              <span className="location-detail__type-label">{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ) : (
                    <div className="location-detail__type-badge">
                      <span className="location-detail__type-icon">{getTypeData(location.type).icon}</span>
                      <span className="location-detail__type-text">{getTypeData(location.type).label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(location.imageUrl || (isEditing && formData.imageUrl)) && (
              <div className="location-detail__image-section">
                {isEditing ? (
                  <div className="location-detail__form-group">
                    <label htmlFor="imageUrl" className="location-detail__label">
                      <FaImage className="location-detail__label-icon" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      value={formData.imageUrl || ""}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                      className="location-detail__input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ) : null}
                {(isEditing ? formData.imageUrl : location.imageUrl) && (
                  <div className="location-detail__image">
                    <img
                      src={isEditing ? formData.imageUrl : location.imageUrl}
                      alt={location.name}
                      className="location-detail__img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="location-detail__description-section">
              {isEditing ? (
                <div className="location-detail__form-group">
                  <label htmlFor="description" className="location-detail__label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`location-detail__textarea ${errors.description ? "location-detail__textarea--error" : ""}`}
                    placeholder="Describe the location..."
                    rows={4}
                  />
                  {errors.description && (
                    <span className="location-detail__error">{errors.description}</span>
                  )}
                </div>
              ) : (
                <div className="location-detail__description">
                  <h2 className="location-detail__section-title">Description</h2>
                  <p className="location-detail__text">{location.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="location-detail__sidebar">
            <div className="location-detail__info-card">
              <h3 className="location-detail__card-title">
                <FaUsers className="location-detail__card-icon" />
                Inhabitants
              </h3>
              {isEditing ? (
                <div className="location-detail__form-group">
                  <div className="location-detail__inhabitants">
                    {formData.inhabitants.map((inhabitant, index) => (
                      <div key={`inhabitant-${index}-${inhabitant}`} className="location-detail__inhabitant-row">
                        <input
                          type="text"
                          value={inhabitant}
                          onChange={(e) => handleInhabitantChange(index, e.target.value)}
                          className="location-detail__input"
                          placeholder="Enter inhabitant name..."
                        />
                        <button
                          type="button"
                          className="location-detail__inhabitant-btn location-detail__inhabitant-btn--remove"
                          onClick={() => removeInhabitant(index)}
                          disabled={formData.inhabitants.length === 1}
                        >
                          <FaMinus />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="location-detail__inhabitant-btn location-detail__inhabitant-btn--add"
                      onClick={addInhabitant}
                    >
                      <FaPlus className="location-detail__add-icon" />
                      Add Inhabitant
                    </button>
                  </div>
                  {errors.inhabitants && (
                    <span className="location-detail__error">{errors.inhabitants}</span>
                  )}
                </div>
              ) : (
                <ul className="location-detail__list">
                  {location.inhabitants.map((inhabitant, index) => (
                    <li key={`${inhabitant}-${index}`} className="location-detail__list-item">
                      {inhabitant}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {(location.history || isEditing) && (
              <div className="location-detail__info-card">
                <h3 className="location-detail__card-title">History</h3>
                {isEditing ? (
                  <div className="location-detail__form-group">
                    <textarea
                      value={formData.history}
                      onChange={(e) => handleInputChange("history", e.target.value)}
                      className="location-detail__textarea"
                      placeholder="Describe the location's history..."
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    {location.history ? (
                      <p className="location-detail__text">{location.history}</p>
                    ) : (
                      <p className="location-detail__empty">No history recorded</p>
                    )}
                  </>
                )}
              </div>
            )}

            {(location.secrets || isEditing) && (
              <div className="location-detail__info-card">
                <h3 className="location-detail__card-title">
                  <FaEye className="location-detail__card-icon" />
                  Secrets
                </h3>
                {isEditing ? (
                  <div className="location-detail__form-group">
                    <textarea
                      value={formData.secrets}
                      onChange={(e) => handleInputChange("secrets", e.target.value)}
                      className="location-detail__textarea"
                      placeholder="Hidden secrets or plot hooks..."
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    {location.secrets ? (
                      <p className="location-detail__text">{location.secrets}</p>
                    ) : (
                      <p className="location-detail__empty">No secrets recorded</p>
                    )}
                  </>
                )}
              </div>
            )}

            {(location.mapUrl || (isEditing && formData.mapUrl)) && (
              <div className="location-detail__info-card">
                <h3 className="location-detail__card-title">
                  <FaMap className="location-detail__card-icon" />
                  Map
                </h3>
                {isEditing && (
                  <div className="location-detail__form-group">
                    <input
                      type="url"
                      value={formData.mapUrl || ""}
                      onChange={(e) => handleInputChange("mapUrl", e.target.value)}
                      className="location-detail__input"
                      placeholder="https://example.com/map.jpg"
                    />
                  </div>
                )}
                {(isEditing ? formData.mapUrl : location.mapUrl) && (
                  <div className="location-detail__map">
                    <img
                      src={isEditing ? formData.mapUrl : location.mapUrl}
                      alt={`Map of ${location.name}`}
                      className="location-detail__map-img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="location-detail__modal-overlay">
            <div className="location-detail__modal">
              <h3 className="location-detail__modal-title">Delete Location</h3>
              <p className="location-detail__modal-text">
                Are you sure you want to delete "{location.name}"? This action cannot be undone.
              </p>
              <div className="location-detail__modal-actions">
                <button
                  className="location-detail__modal-btn location-detail__modal-btn--cancel"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="location-detail__modal-btn location-detail__modal-btn--delete"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetail;
