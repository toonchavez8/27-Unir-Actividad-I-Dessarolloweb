import type { Campaign } from "@/types/campaigns";

export interface CampaignHeroProps {
  readonly campaign: Campaign;
}

export function CampaignHero({ campaign }: CampaignHeroProps) {
  const getStatusModifier = (status: string) => {
    switch (status) {
      case "active":
        return "campaign-detail__badge--active";
      case "planning":
        return "campaign-detail__badge--planning";
      case "completed":
        return "campaign-detail__badge--completed";
      case "paused":
        return "campaign-detail__badge--paused";
      default:
        return "campaign-detail__badge--default";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <section className="campaign-detail__hero">
      {campaign.imageUrl && (
        <div className="campaign-detail__hero-image">
          <img
            src={campaign.imageUrl}
            alt={`${campaign.title} banner`}
            className="campaign-detail__hero-img"
          />
        </div>
      )}

      <div className="campaign-detail__hero-content">
        <div className="campaign-detail__title-section">
          <h1 className="campaign-detail__title">{campaign.title}</h1>
          <p className="campaign-detail__world">World: {campaign.worldName}</p>
          <span
            className={`campaign-detail__badge ${getStatusModifier(campaign.status)}`}
          >
            {campaign.status}
          </span>
        </div>

        <p className="campaign-detail__description">{campaign.description}</p>

        <div className="campaign-detail__meta">
          <div className="campaign-detail__meta-item">
            <span className="campaign-detail__meta-label">Created:</span>
            <span className="campaign-detail__meta-value">
              {formatDate(campaign.createdAt)}
            </span>
          </div>
          <div className="campaign-detail__meta-item">
            <span className="campaign-detail__meta-label">Last Updated:</span>
            <span className="campaign-detail__meta-value">
              {formatDate(campaign.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
