import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave, FaUsers, FaTrash } from "react-icons/fa";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./NPCForm.css";

interface NPCFormProps {
  readonly npcId?: string;
  readonly campaignId?: string;
}

export function NPCForm({ npcId, campaignId }: NPCFormProps) {
  const navigate = useNavigate();
  const { campaigns, createNPC, updateNPC, deleteNPC, getNPCById, loading } = useCampaigns();
  
  const existingNPC = npcId ? getNPCById(npcId) : null;
  const isEditing = !!npcId;

  const [formData, setFormData] = useState({
    campaignId: existingNPC?.campaignId || campaignId || "",
    name: existingNPC?.name || "",
    race: existingNPC?.race || "",
    class: existingNPC?.class || "",
    description: existingNPC?.description || "",
    personality: existingNPC?.personality || "",
    motivations: existingNPC?.motivations || "",
    secrets: existingNPC?.secrets || "",
    location: existingNPC?.location || "",
    status: existingNPC?.status || "alive",
    imageUrl: existingNPC?.imageUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when existingNPC changes
  useEffect(() => {
    if (existingNPC) {
      setFormData({
        campaignId: existingNPC.campaignId,
        name: existingNPC.name,
        race: existingNPC.race,
        class: existingNPC.class || "",
        description: existingNPC.description,
        personality: existingNPC.personality,
        motivations: existingNPC.motivations,
        secrets: existingNPC.secrets,
        location: existingNPC.location || "",
        status: existingNPC.status,
        imageUrl: existingNPC.imageUrl || "",
      });
    } else if (campaignId) {
      // Reset form for new NPC with campaign pre-selected
      setFormData({
        campaignId,
        name: "",
        race: "",
        class: "",
        description: "",
        personality: "",
        motivations: "",
        secrets: "",
        location: "",
        status: "alive",
        imageUrl: "",
      });
    }
  }, [existingNPC, campaignId]);

  const races = [
    "Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", 
    "Half-Orc", "Tiefling", "Aasimar", "Genasi", "Goliath", "Tabaxi", "Other"
  ];

  const classes = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin",
    "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer", "Commoner"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.race.trim()) {
      newErrors.race = "Race is required";
    }
    if (!formData.campaignId) {
      newErrors.campaignId = "Campaign is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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
      const npcData = {
        ...formData,
        relationships: existingNPC?.relationships || [],
      };

      if (isEditing && npcId) {
        updateNPC(npcId, npcData);
      } else {
        createNPC(npcData);
      }
      
      navigate("/npcs");
    } catch (error) {
      console.error("Failed to save NPC:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!npcId) return;
    
    setIsDeleting(true);
    
    try {
      deleteNPC(npcId);
      navigate("/npcs");
    } catch (error) {
      console.error("Failed to delete NPC:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleInputChange = (field: string, value: string) => {
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
  if (isEditing && loading && !existingNPC) {
    return (
      <div className="npc-form page-container">
        <div className="npc-form__loading">
          <div className="npc-form__loading-title"></div>
          <div className="npc-form__loading-description"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="npc-form page-container">
      <header className="npc-form__header">
        <button
          className="npc-form__back-button"
          onClick={() => navigate("/npcs")}
          type="button"
        >
          <FaArrowLeft className="npc-form__back-icon" />
          Back to NPCs
        </button>
        
        <div className="npc-form__title-section">
          <h1 className="npc-form__title">
            {isEditing ? "Edit NPC" : "Create New NPC"}
          </h1>
          <p className="npc-form__description">
            {isEditing ? "Update NPC details" : "Add a new character to your campaign"}
          </p>
        </div>
      </header>

      <form className="npc-form__form" onSubmit={handleSubmit}>
        <div className="npc-form__grid">
          <div className="npc-form__main">
            <section className="npc-form__card">
              <header className="npc-form__card-header">
                <h2 className="npc-form__card-title">
                  <FaUsers className="npc-form__card-icon" />
                  Basic Information
                </h2>
              </header>
              
              <div className="npc-form__card-content">
                <div className="npc-form__field">
                  <label htmlFor="campaignId" className="npc-form__label">
                    Campaign *
                  </label>
                  <select
                    id="campaignId"
                    className={`npc-form__select ${errors.campaignId ? "npc-form__select--error" : ""}`}
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
                    <span className="npc-form__error">{errors.campaignId}</span>
                  )}
                </div>

                <div className="npc-form__field">
                  <label htmlFor="name" className="npc-form__label">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`npc-form__input ${errors.name ? "npc-form__input--error" : ""}`}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter NPC name..."
                    required
                  />
                  {errors.name && (
                    <span className="npc-form__error">{errors.name}</span>
                  )}
                </div>

                <div className="npc-form__field-group">
                  <div className="npc-form__field">
                    <label htmlFor="race" className="npc-form__label">
                      Race *
                    </label>
                    <select
                      id="race"
                      className={`npc-form__select ${errors.race ? "npc-form__select--error" : ""}`}
                      value={formData.race}
                      onChange={(e) => handleInputChange("race", e.target.value)}
                      required
                    >
                      <option value="">Select race</option>
                      {races.map((race) => (
                        <option key={race} value={race}>
                          {race}
                        </option>
                      ))}
                    </select>
                    {errors.race && (
                      <span className="npc-form__error">{errors.race}</span>
                    )}
                  </div>

                  <div className="npc-form__field">
                    <label htmlFor="class" className="npc-form__label">
                      Class
                    </label>
                    <select
                      id="class"
                      className="npc-form__select"
                      value={formData.class}
                      onChange={(e) => handleInputChange("class", e.target.value)}
                    >
                      <option value="">Select class</option>
                      {classes.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="npc-form__field-group">
                  <div className="npc-form__field">
                    <label htmlFor="location" className="npc-form__label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="npc-form__input"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Where is this NPC located?"
                    />
                  </div>

                  <div className="npc-form__field">
                    <label htmlFor="status" className="npc-form__label">
                      Status
                    </label>
                    <select
                      id="status"
                      className="npc-form__select"
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    >
                      <option value="alive">Alive</option>
                      <option value="dead">Dead</option>
                      <option value="missing">Missing</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="npc-form__field">
                  <label htmlFor="description" className="npc-form__label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    className={`npc-form__textarea ${errors.description ? "npc-form__textarea--error" : ""}`}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the NPC's appearance and background..."
                    rows={4}
                    required
                  />
                  {errors.description && (
                    <span className="npc-form__error">{errors.description}</span>
                  )}
                </div>
              </div>
            </section>

            <section className="npc-form__card">
              <header className="npc-form__card-header">
                <h2 className="npc-form__card-title">Character Details</h2>
              </header>
              
              <div className="npc-form__card-content">
                <div className="npc-form__field">
                  <label htmlFor="personality" className="npc-form__label">
                    Personality
                  </label>
                  <textarea
                    id="personality"
                    className="npc-form__textarea"
                    value={formData.personality}
                    onChange={(e) => handleInputChange("personality", e.target.value)}
                    placeholder="Describe the NPC's personality traits..."
                    rows={3}
                  />
                </div>

                <div className="npc-form__field">
                  <label htmlFor="motivations" className="npc-form__label">
                    Motivations
                  </label>
                  <textarea
                    id="motivations"
                    className="npc-form__textarea"
                    value={formData.motivations}
                    onChange={(e) => handleInputChange("motivations", e.target.value)}
                    placeholder="What drives this NPC?"
                    rows={3}
                  />
                </div>

                <div className="npc-form__field">
                  <label htmlFor="secrets" className="npc-form__label">
                    Secrets
                  </label>
                  <textarea
                    id="secrets"
                    className="npc-form__textarea"
                    value={formData.secrets}
                    onChange={(e) => handleInputChange("secrets", e.target.value)}
                    placeholder="What secrets does this NPC hide?"
                    rows={3}
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="npc-form__sidebar">
            <section className="npc-form__card">
              <header className="npc-form__card-header">
                <h2 className="npc-form__card-title">NPC Image</h2>
              </header>
              
              <div className="npc-form__card-content">
                <div className="npc-form__field">
                  <label htmlFor="imageUrl" className="npc-form__label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    className="npc-form__input"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    placeholder="Enter image URL..."
                  />
                </div>

                {formData.imageUrl && (
                  <div className="npc-form__image-preview">
                    <img
                      src={formData.imageUrl}
                      alt="NPC preview"
                      className="npc-form__preview-img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="npc-form__card">
              <div className="npc-form__card-content">
                <div className="npc-form__submit-container">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="npc-form__submit-button"
                  >
                    <FaSave className="npc-form__submit-icon" />
                    {(() => {
                      if (isSubmitting) return "Saving...";
                      return isEditing ? "Update NPC" : "Create NPC";
                    })()}
                  </button>
                </div>

                {isEditing && existingNPC && (
                  <div className="npc-form__delete-container">
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      disabled={isDeleting}
                      className="npc-form__delete-button"
                    >
                      <FaTrash className="npc-form__delete-icon" />
                      {isDeleting ? "Deleting..." : "Delete NPC"}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {isEditing && existingNPC && (
              <section className="npc-form__card">
                <header className="npc-form__card-header">
                  <h2 className="npc-form__card-title">Current Campaign</h2>
                </header>
                <div className="npc-form__card-content">
                  <p className="npc-form__campaign-info">
                    {getCampaignTitle(existingNPC.campaignId)}
                  </p>
                </div>
              </section>
            )}
          </aside>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="npc-form__modal-overlay">
          <div className="npc-form__modal">
            <header className="npc-form__modal-header">
              <h2 className="npc-form__modal-title">Delete NPC</h2>
            </header>
            <div className="npc-form__modal-content">
              <p className="npc-form__modal-text">
                Are you sure you want to delete <strong>{existingNPC?.name}</strong>? 
                This action cannot be undone.
              </p>
            </div>
            <footer className="npc-form__modal-footer">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="npc-form__modal-button npc-form__modal-button--cancel"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="npc-form__modal-button npc-form__modal-button--delete"
                disabled={isDeleting}
              >
                <FaTrash className="npc-form__modal-delete-icon" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default NPCForm;
