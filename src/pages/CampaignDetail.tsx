import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaCalendar, FaUsers, FaEdit, FaPlay } from "react-icons/fa";
import { FaMapLocationDot, FaShop } from "react-icons/fa6";
import { GiSwordSmithing } from "react-icons/gi";
import { useCampaigns } from "@/hooks/useCampaigns";
import "@/css/CampaignDetail.css";

export function CampaignDetail() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { campaigns, sessions, npcs, locations, shops, items } = useCampaigns();

  const campaign = campaigns.find(c => c.id === campaignId);

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
            onClick={() => navigate('/campaigns')}
          >
            <FaArrowLeft className="campaign-detail__back-icon" />
            Back to Campaigns
          </button>
        </section>
      </main>
    );
  }

  const campaignSessions = sessions.filter(session => session.campaignId === campaign.id);
  const campaignNPCs = npcs.filter(npc => npc.campaignId === campaign.id);
  const campaignLocations = locations.filter(location => location.campaignId === campaign.id);
  const campaignShops = shops.filter(shop => shop.campaignId === campaign.id);
  const campaignItems = items.filter(item => item.campaignId === campaign.id);

  const getStatusModifier = (status: string) => {
    switch (status) {
      case 'active':
        return 'campaign-detail__badge--active';
      case 'planning':
        return 'campaign-detail__badge--planning';
      case 'completed':
        return 'campaign-detail__badge--completed';
      case 'paused':
        return 'campaign-detail__badge--paused';
      default:
        return 'campaign-detail__badge--default';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const sortedRecentSessions = [...campaignSessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recentSessions = sortedRecentSessions.slice(0, 3);

  const sortedUpcomingSessions = [...campaignSessions]
    .filter(session => session.status === 'planned')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingSessions = sortedUpcomingSessions.slice(0, 3);

  return (
    <div className="campaign-detail page-container">
      <header className="campaign-detail__header">
        <button 
          className="campaign-detail__back-button"
          onClick={() => navigate('/campaigns')}
        >
          <FaArrowLeft className="campaign-detail__back-icon" />
          Back to Campaigns
        </button>

        <nav className="campaign-detail__actions">
          <button className="campaign-detail__action-button campaign-detail__action-button--secondary">
            <FaEdit className="campaign-detail__action-icon" />
            Edit Campaign
          </button>
          {campaign.status === 'active' && (
            <button className="campaign-detail__action-button campaign-detail__action-button--primary">
              <FaPlay className="campaign-detail__action-icon" />
              Start Session
            </button>
          )}
        </nav>
      </header>

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
            <span className={`campaign-detail__badge ${getStatusModifier(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
          
          <p className="campaign-detail__description">{campaign.description}</p>
          
          <div className="campaign-detail__meta">
            <div className="campaign-detail__meta-item">
              <span className="campaign-detail__meta-label">Created:</span>
              <span className="campaign-detail__meta-value">{formatDate(campaign.createdAt)}</span>
            </div>
            <div className="campaign-detail__meta-item">
              <span className="campaign-detail__meta-label">Last Updated:</span>
              <span className="campaign-detail__meta-value">{formatDate(campaign.updatedAt)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="campaign-detail__stats">
        <div className="campaign-detail__stat-card">
          <FaCalendar className="campaign-detail__stat-icon" />
          <div className="campaign-detail__stat-content">
            <span className="campaign-detail__stat-number">{campaignSessions.length}</span>
            <span className="campaign-detail__stat-label">Sessions</span>
          </div>
        </div>

        <div className="campaign-detail__stat-card">
          <FaUsers className="campaign-detail__stat-icon" />
          <div className="campaign-detail__stat-content">
            <span className="campaign-detail__stat-number">{campaignNPCs.length}</span>
            <span className="campaign-detail__stat-label">NPCs</span>
          </div>
        </div>

        <div className="campaign-detail__stat-card">
          <FaMapLocationDot className="campaign-detail__stat-icon" />
          <div className="campaign-detail__stat-content">
            <span className="campaign-detail__stat-number">{campaignLocations.length}</span>
            <span className="campaign-detail__stat-label">Locations</span>
          </div>
        </div>

        <div className="campaign-detail__stat-card">
          <FaShop className="campaign-detail__stat-icon" />
          <div className="campaign-detail__stat-content">
            <span className="campaign-detail__stat-number">{campaignShops.length}</span>
            <span className="campaign-detail__stat-label">Shops</span>
          </div>
        </div>

        <div className="campaign-detail__stat-card">
          <GiSwordSmithing className="campaign-detail__stat-icon" />
          <div className="campaign-detail__stat-content">
            <span className="campaign-detail__stat-number">{campaignItems.length}</span>
            <span className="campaign-detail__stat-label">Items</span>
          </div>
        </div>
      </section>

      <div className="campaign-detail__content">
        <div className="campaign-detail__main">
          {campaign.notes && (
            <section className="campaign-detail__section">
              <h2 className="campaign-detail__section-title">Campaign Notes</h2>
              <div className="campaign-detail__notes">
                <p>{campaign.notes}</p>
              </div>
            </section>
          )}

          {upcomingSessions.length > 0 && (
            <section className="campaign-detail__section">
              <h2 className="campaign-detail__section-title">Upcoming Sessions</h2>
              <div className="campaign-detail__sessions-grid">
                {upcomingSessions.map(session => (
                  <button 
                    key={session.id} 
                    className="campaign-detail__session-card"
                    onClick={() => navigate(`/campaigns/${campaign.id}/sessions/${session.id}`)}
                  >
                    <h3 className="campaign-detail__session-title">{session.title}</h3>
                    <p className="campaign-detail__session-date">
                      {formatDate(session.date)}
                    </p>
                    <p className="campaign-detail__session-description">{session.description}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {recentSessions.length > 0 && (
            <section className="campaign-detail__section">
              <h2 className="campaign-detail__section-title">Recent Sessions</h2>
              <div className="campaign-detail__sessions-grid">
                {recentSessions.map(session => (
                  <button 
                    key={session.id} 
                    className="campaign-detail__session-card"
                    onClick={() => navigate(`/campaigns/${campaign.id}/sessions/${session.id}`)}
                  >
                    <h3 className="campaign-detail__session-title">{session.title}</h3>
                    <p className="campaign-detail__session-date">
                      {formatDate(session.date)}
                    </p>
                    <p className="campaign-detail__session-description">{session.description}</p>
                    <span className={`campaign-detail__session-status campaign-detail__session-status--${session.status}`}>
                      {session.status}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="campaign-detail__sidebar">
          <nav className="campaign-detail__quick-links">
            <h3 className="campaign-detail__sidebar-title">Quick Actions</h3>
            <div className="campaign-detail__quick-link-grid">
              <button 
                className="campaign-detail__quick-link"
                onClick={() => navigate('/sessions/new')}
              >
                <FaCalendar className="campaign-detail__quick-link-icon" />
                Plan Session
              </button>
              <button 
                className="campaign-detail__quick-link"
                onClick={() => navigate('/npcs/new')}
              >
                <FaUsers className="campaign-detail__quick-link-icon" />
                Add NPC
              </button>
              <button 
                className="campaign-detail__quick-link"
                onClick={() => navigate('/locations/new')}
              >
                <FaMapLocationDot className="campaign-detail__quick-link-icon" />
                Add Location
              </button>
              <button 
                className="campaign-detail__quick-link"
                onClick={() => navigate('/shops/new')}
              >
                <FaShop className="campaign-detail__quick-link-icon" />
                Add Shop
              </button>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default CampaignDetail;
