import { FaArrowLeft, FaEdit, FaPlay } from "react-icons/fa";
import type { NavigateFunction } from "react-router";

export interface CampaignHeaderProps {
  readonly navigate: NavigateFunction;
  readonly campaignStatus: string;
}

export function CampaignHeader({
  navigate,
  campaignStatus,
}: CampaignHeaderProps) {
  return (
    <header className="campaign-detail__header">
      <button
        className="campaign-detail__back-button"
        onClick={() => navigate("/campaigns")}
      >
        <FaArrowLeft className="campaign-detail__back-icon" />
        Back to Campaigns
      </button>

      <nav className="campaign-detail__actions">
        <button className="campaign-detail__action-button campaign-detail__action-button--secondary">
          <FaEdit className="campaign-detail__action-icon" />
          Edit Campaign
        </button>
        {campaignStatus === "active" && (
          <button className="campaign-detail__action-button campaign-detail__action-button--primary">
            <FaPlay className="campaign-detail__action-icon" />
            Start Session
          </button>
        )}
      </nav>
    </header>
  );
}
