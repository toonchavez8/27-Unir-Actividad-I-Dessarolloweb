import { useNavigate } from "react-router";
import { FaCalendar, FaUsers, FaArrowRight } from "react-icons/fa";
import { GiSwordWound } from "react-icons/gi";
import { Card } from "@/components/atomic/Card";
import { useCampaigns } from "@/hooks/useCampaigns";
import "./RecentCampaigns.css";

export function RecentCampaigns() {
  const { campaigns, sessions, npcs } = useCampaigns();
  const navigate = useNavigate();

  const sortedCampaigns = [...campaigns].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const recentCampaigns = sortedCampaigns.slice(0, 3);

  const getCampaignSessions = (campaignId: string) => {
    return sessions.filter(session => session.campaignId === campaignId);
  };

  const getCampaignNPCs = (campaignId: string) => {
    return npcs.filter(npc => npc.campaignId === campaignId);
  };

  const getStatusModifier = (status: string) => {
    switch (status) {
      case 'active':
        return 'recent-campaigns__badge--active';
      case 'planning':
        return 'recent-campaigns__badge--planning';
      case 'completed':
        return 'recent-campaigns__badge--completed';
      case 'paused':
        return 'recent-campaigns__badge--paused';
      default:
        return 'recent-campaigns__badge--default';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Updated just now';
    if (diffInHours < 24) return `Updated ${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Updated ${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `Updated ${diffInWeeks}w ago`;
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, campaignId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCampaignClick(campaignId);
    }
  };

  if (campaigns.length === 0) {
    return (
      <Card className="recent-campaigns">
        <div className="recent-campaigns__header">
          <h3 className="recent-campaigns__title">
            <GiSwordWound className="recent-campaigns__title-icon" />
            Your Campaigns
          </h3>
        </div>
        
        <div className="recent-campaigns__empty">
          <div className="recent-campaigns__empty-icon">
            <GiSwordWound />
          </div>
          <p className="recent-campaigns__empty-text">No campaigns yet</p>
          <button 
            className="recent-campaigns__create-button"
            onClick={() => navigate('/campaigns/new')}
          >
            Create Your First Campaign
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="recent-campaigns">
      <div className="recent-campaigns__header">
        <h3 className="recent-campaigns__title">
          <GiSwordWound className="recent-campaigns__title-icon" />
          Recent Campaigns
        </h3>
        <button 
          className="recent-campaigns__view-all"
          onClick={() => navigate('/campaigns')}
        >
          View All
          <FaArrowRight className="recent-campaigns__view-all-icon" />
        </button>
      </div>
      
      <div className="recent-campaigns__content">
        {recentCampaigns.map((campaign) => {
          const campaignSessions = getCampaignSessions(campaign.id);
          const campaignNPCs = getCampaignNPCs(campaign.id);
          
          return (
            <button
              key={campaign.id}
              className="recent-campaigns__item"
              onClick={() => handleCampaignClick(campaign.id)}
              onKeyDown={(e) => handleKeyDown(e, campaign.id)}
            >
              <div className="recent-campaigns__item-header">
                <div className="recent-campaigns__item-info">
                  <h4 className="recent-campaigns__item-title">{campaign.title}</h4>
                  <p className="recent-campaigns__item-world">{campaign.worldName}</p>
                </div>
                <span className={`recent-campaigns__badge ${getStatusModifier(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              
              <p className="recent-campaigns__item-description">
                {campaign.description}
              </p>
              
              <div className="recent-campaigns__item-footer">
                <div className="recent-campaigns__stats">
                  <span className="recent-campaigns__stat">
                    <FaCalendar className="recent-campaigns__stat-icon" />
                    {campaignSessions.length} session{campaignSessions.length !== 1 ? 's' : ''}
                  </span>
                  <span className="recent-campaigns__stat">
                    <FaUsers className="recent-campaigns__stat-icon" />
                    {campaignNPCs.length} NPC{campaignNPCs.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="recent-campaigns__updated">
                  {formatTimeAgo(campaign.updatedAt)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
