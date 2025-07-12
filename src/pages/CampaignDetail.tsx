import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignHeader } from "@/components/campaigns/CampaignHeader";
import { CampaignHero } from "@/components/campaigns/CampaignHero";
import { CampaignStats } from "@/components/campaigns/CampaignStats";
import { CampaignNotesEditor } from "@/components/campaigns/CampaignNotesEditor";
import { SessionsList } from "@/components/campaigns/SessionsList";
import { QuickActions } from "@/components/campaigns/QuickActions";
import type { Campaign } from "@/types/campaigns";
import "@/css/CampaignDetail.css";

export function CampaignDetail() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { campaigns, sessions, npcs, locations, shops, items, updateCampaign } =
    useCampaigns();

  // Local state to track campaign updates
  const [localCampaign] = useState<Campaign | null>(null);

  // Get campaign from either local state or original campaigns
  const campaign = localCampaign || campaigns.find((c) => c.id === campaignId);

  // Handle campaign updates from notes editor
  const handleCampaignUpdate = (updatedCampaign: Campaign) => {
    if (!campaign) return;
    // Update the campaign object
    updateCampaign(campaign.id, updatedCampaign);
  };

  if (!campaign) {
    return (
      <main className="campaign-detail">
        <section className="campaign-detail__error">
          <h1 className="campaign-detail__error-title">Campaign Not Found</h1>
          <p className="campaign-detail__error-message">
            The campaign you're looking for doesn't exist or has been removed.
          </p>
          <button
            className="campaign-detail__back-button"
            onClick={() => navigate("/campaigns")}
          >
            <FaArrowLeft className="campaign-detail__back-icon" />
            Back to Campaigns
          </button>
        </section>
      </main>
    );
  }

  // Filter and sort data
  const campaignSessions = sessions.filter(
    (session) => session.campaignId === campaign.id,
  );
  const campaignNPCs = npcs.filter((npc) => npc.campaignId === campaign.id);
  const campaignLocations = locations.filter(
    (location) => location.campaignId === campaign.id,
  );
  const campaignShops = shops.filter((shop) => shop.campaignId === campaign.id);
  const campaignItems = items.filter((item) => item.campaignId === campaign.id);

  const sortedRecentSessions = [...campaignSessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const recentSessions = sortedRecentSessions.slice(0, 3);

  const sortedUpcomingSessions = [...campaignSessions]
    .filter((session) => session.status === "planned")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingSessions = sortedUpcomingSessions.slice(0, 3);

  return (
    <div className="campaign-detail page-container">
      <CampaignHeader 
        navigate={navigate} 
        campaignStatus={campaign.status}
        campaignId={campaign.id}
      />

      <CampaignHero campaign={campaign} />

      <CampaignStats
        sessionsCount={campaignSessions.length}
        npcsCount={campaignNPCs.length}
        locationsCount={campaignLocations.length}
        shopsCount={campaignShops.length}
        itemsCount={campaignItems.length}
      />

      <div className="campaign-detail__content">
        <div className="campaign-detail__main">
          <CampaignNotesEditor
            campaign={campaign}
            onNotesUpdate={handleCampaignUpdate}
          />

          <SessionsList
            sessions={upcomingSessions}
            title="Upcoming Sessions"
            campaignId={campaign.id}
            navigate={navigate}
          />

          <SessionsList
            sessions={recentSessions}
            title="Recent Sessions"
            campaignId={campaign.id}
            navigate={navigate}
            showStatus={true}
          />
        </div>

        <QuickActions navigate={navigate} />
      </div>
    </div>
  );
}

export default CampaignDetail;
