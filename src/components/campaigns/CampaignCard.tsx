import { useNavigate } from "react-router";
import { FaCalendar, FaUsers, FaEye } from "react-icons/fa";
import { useCampaigns } from "@/hooks/useCampaigns";
import type { Campaign } from "@/types/campaigns";
import "./CampaignCard.css";

interface CampaignCardProps {
  readonly campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const navigate = useNavigate();
  const { sessions, npcs } = useCampaigns();

  const campaignSessions = sessions.filter(
    (session) => session.campaignId === campaign.id,
  );
  const campaignNPCs = npcs.filter((npc) => npc.campaignId === campaign.id);

  const getStatusModifier = (status: string) => {
    switch (status) {
      case "active":
        return "campaign-card__badge--active";
      case "planning":
        return "campaign-card__badge--planning";
      case "completed":
        return "campaign-card__badge--completed";
      case "paused":
        return "campaign-card__badge--paused";
      default:
        return "campaign-card__badge--default";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleCardClick = () => {
    navigate(`/campaigns/${campaign.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <button
      className="campaign-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`View campaign: ${campaign.title}`}
    >
      <div className="campaign-card__header">
        <div className="campaign-card__title-section">
          <h3 className="campaign-card__title">{campaign.title}</h3>
          <p className="campaign-card__world">{campaign.worldName}</p>
        </div>
        <span
          className={`campaign-card__badge ${getStatusModifier(campaign.status)}`}
        >
          {campaign.status}
        </span>
      </div>

      {campaign.imageUrl && (
        <div className="campaign-card__image">
          <img
            src={campaign.imageUrl}
            alt={`${campaign.title} banner`}
            className="campaign-card__img"
          />
        </div>
      )}

      <div className="campaign-card__content">
        <p className="campaign-card__description">{campaign.description}</p>

        <div className="campaign-card__stats">
          <div className="campaign-card__stat">
            <FaCalendar className="campaign-card__stat-icon" />
            <span className="campaign-card__stat-text">
              {campaignSessions.length} session
              {campaignSessions.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="campaign-card__stat">
            <FaUsers className="campaign-card__stat-icon" />
            <span className="campaign-card__stat-text">
              {campaignNPCs.length} NPC{campaignNPCs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="campaign-card__footer">
        <div className="campaign-card__dates">
          <span className="campaign-card__date">
            Created {formatDate(campaign.createdAt)}
          </span>
          {campaign.updatedAt.getTime() !== campaign.createdAt.getTime() && (
            <span className="campaign-card__date">
              Updated {formatDate(campaign.updatedAt)}
            </span>
          )}
        </div>
        <div className="campaign-card__action">
          <FaEye className="campaign-card__action-icon" />
          <span className="campaign-card__action-text">View Details</span>
        </div>
      </div>
    </button>
  );
}
