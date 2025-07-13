import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./ItemForm.css";
import {
  FaArrowLeft,
  FaSave,
  FaBox,
  FaPlus,
  FaTimes,
  FaImage,
  FaCoins,
  FaWeight
} from "react-icons/fa";
import type { Item } from "@/types/campaigns";

interface ItemFormProps {
  itemId?: string;
  campaignId?: string;
}

const ItemForm = ({ itemId, campaignId }: ItemFormProps) => {
  const navigate = useNavigate();
  const { campaigns, items, createItem, updateItem, loading } = useCampaigns();
  
  const existingItem = itemId ? items.find(item => item.id === itemId) : null;
  const isEditing = !!itemId;

  const [formData, setFormData] = useState({
    campaignId: existingItem?.campaignId || campaignId || '',
    name: existingItem?.name || '',
    type: existingItem?.type || 'other' as Item['type'],
    rarity: existingItem?.rarity || 'common' as Item['rarity'],
    description: existingItem?.description || '',
    value: existingItem?.value || 0,
    weight: existingItem?.weight || 0,
    imageUrl: existingItem?.imageUrl || '',
    notes: existingItem?.notes || ''
  });

  const [properties, setProperties] = useState<string[]>(existingItem?.properties || []);
  const [newProperty, setNewProperty] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const itemTypes: Item['type'][] = [
    'weapon', 'armor', 'consumable', 'tool', 'treasure', 'magic', 'other'
  ];

  const rarities: Item['rarity'][] = [
    'common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'
  ];

  // Update form data when existing item changes
  useEffect(() => {
    if (existingItem) {
      setFormData({
        campaignId: existingItem.campaignId,
        name: existingItem.name,
        type: existingItem.type,
        rarity: existingItem.rarity,
        description: existingItem.description,
        value: existingItem.value,
        weight: existingItem.weight,
        imageUrl: existingItem.imageUrl || '',
        notes: existingItem.notes
      });
      setProperties(existingItem.properties || []);
    }
  }, [existingItem]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.campaignId) {
      newErrors.campaignId = 'Campaign is required';
    }

    if (!formData.type) {
      newErrors.type = 'Item type is required';
    }

    if (formData.value < 0) {
      newErrors.value = 'Value cannot be negative';
    }

    if (formData.weight < 0) {
      newErrors.weight = 'Weight cannot be negative';
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
      const itemData = {
        ...formData,
        properties
      };

      if (isEditing && itemId) {
        updateItem(itemId, itemData);
      } else {
        createItem(itemData);
      }
      
      navigate('/items');
    } catch (error) {
      console.error('Failed to save item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addProperty = () => {
    if (newProperty.trim() && !properties.includes(newProperty.trim())) {
      setProperties([...properties, newProperty.trim()]);
      setNewProperty('');
    }
  };

  const removeProperty = (property: string) => {
    setProperties(properties.filter(p => p !== property));
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Saving...';
    if (isEditing) return 'Update Item';
    return 'Create Item';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'item-form__rarity-badge--common';
      case 'uncommon':
        return 'item-form__rarity-badge--uncommon';
      case 'rare':
        return 'item-form__rarity-badge--rare';
      case 'very rare':
        return 'item-form__rarity-badge--very-rare';
      case 'legendary':
        return 'item-form__rarity-badge--legendary';
      case 'artifact':
        return 'item-form__rarity-badge--artifact';
      default:
        return 'item-form__rarity-badge--common';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="item-form__loading">
          <div className="item-form__loading-header"></div>
          <div className="item-form__loading-content"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="item-form">
        <div className="item-form__header">
          <div className="item-form__header-content">
            <button
              type="button"
              className="item-form__back-btn"
              onClick={() => navigate('/items')}
            >
              <FaArrowLeft className="item-form__back-icon" />
              Back to Items
            </button>
            <div className="item-form__title-section">
              <h1 className="item-form__title">
                {isEditing ? 'Edit Item' : 'Create New Item'}
              </h1>
              <p className="item-form__subtitle">
                {isEditing ? 'Update item details' : 'Add a new item to your campaign'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="item-form__form">
          <div className="item-form__grid">
            <div className="item-form__main-content">
              <div className="item-form__card">
                <div className="item-form__card-header">
                  <div className="item-form__card-title">
                    <FaBox className="item-form__card-icon" />
                    Item Details
                  </div>
                </div>
                <div className="item-form__card-content">
                  <div className="item-form__form-group">
                    <label htmlFor="campaignId" className="item-form__label">
                      Campaign *
                    </label>
                    <select
                      id="campaignId"
                      value={formData.campaignId}
                      onChange={(e) => handleInputChange('campaignId', e.target.value)}
                      className={`item-form__select ${errors.campaignId ? 'item-form__select--error' : ''}`}
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
                      <span className="item-form__error">{errors.campaignId}</span>
                    )}
                  </div>

                  <div className="item-form__form-group">
                    <label htmlFor="name" className="item-form__label">
                      Item Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter item name..."
                      className={`item-form__input ${errors.name ? 'item-form__input--error' : ''}`}
                      required
                    />
                    {errors.name && (
                      <span className="item-form__error">{errors.name}</span>
                    )}
                  </div>

                  <div className="item-form__form-row">
                    <div className="item-form__form-group">
                      <label htmlFor="type" className="item-form__label">
                        Type *
                      </label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className={`item-form__select ${errors.type ? 'item-form__select--error' : ''}`}
                        required
                      >
                        {itemTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                      {errors.type && (
                        <span className="item-form__error">{errors.type}</span>
                      )}
                    </div>
                    
                    <div className="item-form__form-group">
                      <label htmlFor="rarity" className="item-form__label">
                        Rarity
                      </label>
                      <select
                        id="rarity"
                        value={formData.rarity}
                        onChange={(e) => handleInputChange('rarity', e.target.value)}
                        className="item-form__select"
                      >
                        {rarities.map((rarity) => (
                          <option key={rarity} value={rarity}>
                            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="item-form__form-row">
                    <div className="item-form__form-group">
                      <label htmlFor="value" className="item-form__label">
                        <FaCoins className="item-form__label-icon" />
                        Value (GP)
                      </label>
                      <input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => handleInputChange('value', parseInt(e.target.value) || 0)}
                        className={`item-form__input ${errors.value ? 'item-form__input--error' : ''}`}
                        min="0"
                      />
                      {errors.value && (
                        <span className="item-form__error">{errors.value}</span>
                      )}
                    </div>
                    
                    <div className="item-form__form-group">
                      <label htmlFor="weight" className="item-form__label">
                        <FaWeight className="item-form__label-icon" />
                        Weight (lbs)
                      </label>
                      <input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        className={`item-form__input ${errors.weight ? 'item-form__input--error' : ''}`}
                        min="0"
                      />
                      {errors.weight && (
                        <span className="item-form__error">{errors.weight}</span>
                      )}
                    </div>
                  </div>

                  <div className="item-form__form-group">
                    <label htmlFor="description" className="item-form__label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe the item..."
                      className="item-form__textarea"
                      rows={4}
                    />
                  </div>

                  <div className="item-form__form-group">
                    <label htmlFor="notes" className="item-form__label">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Add any additional notes..."
                      className="item-form__textarea"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="item-form__card">
                <div className="item-form__card-header">
                  <div className="item-form__card-title">Properties</div>
                </div>
                <div className="item-form__card-content">
                  <div className="item-form__property-add">
                    <input
                      type="text"
                      value={newProperty}
                      onChange={(e) => setNewProperty(e.target.value)}
                      placeholder="Add a property (e.g., +1 Attack, Versatile)"
                      className="item-form__input"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addProperty();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addProperty}
                      className="item-form__add-property-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {properties.length > 0 && (
                    <div className="item-form__properties-list">
                      {properties.map((property) => (
                        <div key={property} className="item-form__property-tag">
                          <span>{property}</span>
                          <button
                            type="button"
                            onClick={() => removeProperty(property)}
                            className="item-form__property-remove"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="item-form__sidebar">
              <div className="item-form__card">
                <div className="item-form__card-header">
                  <div className="item-form__card-title">
                    <FaImage className="item-form__card-icon" />
                    Item Image
                  </div>
                </div>
                <div className="item-form__card-content">
                  <div className="item-form__form-group">
                    <label htmlFor="imageUrl" className="item-form__label">
                      Image URL
                    </label>
                    <input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      placeholder="Enter image URL..."
                      className="item-form__input"
                    />
                  </div>

                  {formData.imageUrl && (
                    <div className="item-form__image-preview">
                      <img
                        src={formData.imageUrl}
                        alt="Item preview"
                        className="item-form__preview-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="item-form__card">
                <div className="item-form__card-content">
                  <div className="item-form__rarity-preview">
                    <span className="item-form__rarity-label">Current Rarity:</span>
                    <span className={`item-form__rarity-badge ${getRarityColor(formData.rarity)}`}>
                      {formData.rarity.charAt(0).toUpperCase() + formData.rarity.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="item-form__card">
                <div className="item-form__card-content">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="item-form__submit-btn"
                  >
                    <FaSave className="item-form__submit-icon" />
                    {getSubmitButtonText()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
