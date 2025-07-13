import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./ShopForm.css";
import {
  FaArrowLeft,
  FaSave,
  FaStore,
  FaTimes,
  FaImage
} from "react-icons/fa";
import type { Shop } from "@/types/campaigns";

interface ShopFormProps {
  shopId?: string;
  campaignId?: string;
  onSubmit?: (shopData: Omit<Shop, "id">) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ShopForm = ({ 
  shopId, 
  campaignId, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: ShopFormProps) => {
  const navigate = useNavigate();
  const { campaigns, npcs, locations, getShopById } = useCampaigns();
  
  const existingShop = shopId ? getShopById(shopId) : null;
  const isEditing = !!shopId;

  const [formData, setFormData] = useState({
    campaignId: existingShop?.campaignId || campaignId || "",
    name: existingShop?.name || "",
    description: existingShop?.description || "",
    type: existingShop?.type || "general" as Shop["type"],
    locationId: existingShop?.locationId || "",
    ownerId: existingShop?.ownerId || "",
    imageUrl: existingShop?.imageUrl || "",
    notes: existingShop?.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageError, setImageError] = useState(false);

  const shopTypes: Shop["type"][] = [
    "general", "weapons", "armor", "magic", "alchemy", "tavern", "blacksmith", "other"
  ];

  // Filter NPCs and locations by selected campaign
  const campaignNPCs = npcs.filter(npc => npc.campaignId === formData.campaignId);
  const campaignLocations = locations.filter(location => location.campaignId === formData.campaignId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Shop name is required";
    }

    if (!formData.campaignId) {
      newErrors.campaignId = "Campaign is required";
    }

    if (!formData.type) {
      newErrors.type = "Shop type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const shopData: Omit<Shop, "id"> = {
      ...formData,
      items: existingShop?.items || [],
    };

    if (onSubmit) {
      onSubmit(shopData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is being edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Clear dependent fields when campaign changes
    if (field === "campaignId") {
      setFormData(prev => ({
        ...prev,
        campaignId: value,
        ownerId: "",
        locationId: ""
      }));
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/shops");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const getSubmitButtonText = () => {
    if (isLoading) return "Saving...";
    if (isEditing) return "Update Shop";
    return "Create Shop";
  };

  return (
    <div className="shop-form">
      <div className="shop-form__header">
        <button
          type="button"
          className="shop-form__back-btn"
          onClick={handleCancel}
        >
          <FaArrowLeft className="shop-form__back-icon" />
          Back to Shops
        </button>
        
        <div className="shop-form__title-section">
          <h1 className="shop-form__title">
            {isEditing ? "Edit Shop" : "Create New Shop"}
          </h1>
          <p className="shop-form__description">
            {isEditing ? "Update shop details" : "Add a new shop to your campaign"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="shop-form__form">
        <div className="shop-form__layout">
          <div className="shop-form__main">
            <div className="shop-form__card">
              <div className="shop-form__card-header">
                <FaStore className="shop-form__card-icon" />
                <h2 className="shop-form__card-title">Shop Details</h2>
              </div>
              
              <div className="shop-form__card-content">
                <div className="shop-form__field">
                  <label htmlFor="campaignId" className="shop-form__label">
                    Campaign <span className="shop-form__required">*</span>
                  </label>
                  <select
                    id="campaignId"
                    value={formData.campaignId}
                    onChange={(e) => handleInputChange("campaignId", e.target.value)}
                    className={`shop-form__select ${errors.campaignId ? "shop-form__select--error" : ""}`}
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
                    <span className="shop-form__error">{errors.campaignId}</span>
                  )}
                </div>

                <div className="shop-form__field">
                  <label htmlFor="name" className="shop-form__label">
                    Shop Name <span className="shop-form__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter shop name..."
                    className={`shop-form__input ${errors.name ? "shop-form__input--error" : ""}`}
                    required
                  />
                  {errors.name && (
                    <span className="shop-form__error">{errors.name}</span>
                  )}
                </div>

                <div className="shop-form__field">
                  <label htmlFor="type" className="shop-form__label">
                    Shop Type <span className="shop-form__required">*</span>
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value as Shop["type"])}
                    className={`shop-form__select ${errors.type ? "shop-form__select--error" : ""}`}
                    required
                  >
                    <option value="">Select shop type</option>
                    {shopTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="shop-form__error">{errors.type}</span>
                  )}
                </div>

                <div className="shop-form__field-group">
                  <div className="shop-form__field">
                    <label htmlFor="ownerId" className="shop-form__label">
                      Shop Owner
                    </label>
                    <select
                      id="ownerId"
                      value={formData.ownerId}
                      onChange={(e) => handleInputChange("ownerId", e.target.value)}
                      className="shop-form__select"
                      disabled={!formData.campaignId}
                    >
                      <option value="">No Owner</option>
                      {campaignNPCs.map((npc) => (
                        <option key={npc.id} value={npc.id}>
                          {npc.name}
                        </option>
                      ))}
                    </select>
                    {!formData.campaignId && (
                      <span className="shop-form__help">Select a campaign first</span>
                    )}
                  </div>

                  <div className="shop-form__field">
                    <label htmlFor="locationId" className="shop-form__label">
                      Location
                    </label>
                    <select
                      id="locationId"
                      value={formData.locationId}
                      onChange={(e) => handleInputChange("locationId", e.target.value)}
                      className="shop-form__select"
                      disabled={!formData.campaignId}
                    >
                      <option value="">No Location</option>
                      {campaignLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                    {!formData.campaignId && (
                      <span className="shop-form__help">Select a campaign first</span>
                    )}
                  </div>
                </div>

                <div className="shop-form__field">
                  <label htmlFor="description" className="shop-form__label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the shop..."
                    className="shop-form__textarea"
                    rows={4}
                  />
                </div>

                <div className="shop-form__field">
                  <label htmlFor="notes" className="shop-form__label">
                    Shop Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add any additional notes about the shop..."
                    className="shop-form__textarea"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="shop-form__sidebar">
            <div className="shop-form__card">
              <div className="shop-form__card-header">
                <FaImage className="shop-form__card-icon" />
                <h3 className="shop-form__card-title">Shop Image</h3>
              </div>
              
              <div className="shop-form__card-content">
                <div className="shop-form__field">
                  <label htmlFor="imageUrl" className="shop-form__label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    placeholder="Enter image URL..."
                    className="shop-form__input"
                  />
                </div>

                {formData.imageUrl && (
                  <div className="shop-form__image-preview">
                    {!imageError ? (
                      <img
                        src={formData.imageUrl}
                        alt="Shop preview"
                        className="shop-form__preview-img"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                      />
                    ) : (
                      <div className="shop-form__image-error">
                        <FaImage className="shop-form__image-error-icon" />
                        <span>Failed to load image</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="shop-form__actions">
              <button
                type="submit"
                disabled={isLoading}
                className="shop-form__submit-btn"
              >
                <FaSave className="shop-form__submit-icon" />
                {getSubmitButtonText()}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="shop-form__cancel-btn"
                disabled={isLoading}
              >
                <FaTimes className="shop-form__cancel-icon" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
