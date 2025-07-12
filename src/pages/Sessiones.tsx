import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/Sessions.css";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaCalendar,
  FaClock,
  FaUsers,
  FaTimes,
  FaPlay,
  FaEdit,
} from "react-icons/fa";
import type { Session } from "@/types/campaigns";

const Sessiones = () => {
  const navigate = useNavigate();
  const { sessions, campaigns } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const filteredSessions = sessions.filter((session: Session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || session.status === statusFilter;
    const matchesCampaign =
      campaignFilter === "all" || session.campaignId === campaignFilter;

    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "sessions__badge--completed";
      case "planned":
        return "sessions__badge--planned";
      case "cancelled":
        return "sessions__badge--cancelled";
      case "active":
        return "sessions__badge--active";
      default:
        return "sessions__badge--default";
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCampaignFilter("all");
  };

  return (
    <div className="page-container">
      <div className="sessions__header">
        <div className="sessions__header-content">
          <h1 className="page-title">Sessions</h1>
          <p className="page-description">
            Plan and track your campaign sessions
          </p>
        </div>
        <button
          className="sessions__new-btn"
          onClick={() => navigate("/sessions/create/new")}
        >
          <FaPlus className="sessions__new-btn-icon" />
          New Session
        </button>
      </div>

      <div className="sessions__filters">
        <div className="sessions__search">
          <FaSearch className="sessions__search-icon" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sessions__search-input"
          />
        </div>

        <div className="sessions__filter-group">
          <div className="sessions__filter">
            <FaFilter className="sessions__filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="sessions__filter-select"
            >
              <option value="all">All Status</option>
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="sessions__filter">
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="sessions__filter-select"
            >
              <option value="all">All Campaigns</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="sessions__empty">
          <div className="sessions__empty-icon">
            <FaCalendar />
          </div>
          {sessions.length === 0 ? (
            <>
              <p className="sessions__empty-text">No sessions planned yet</p>
              <button
                className="sessions__empty-btn"
                onClick={() => navigate("/sessions/create/new")}
              >
                Plan Your First Session
              </button>
            </>
          ) : (
            <>
              <p className="sessions__empty-text">
                No sessions match your search criteria
              </p>
              <button
                className="sessions__empty-btn sessions__empty-btn--secondary"
                onClick={clearFilters}
              >
                <FaTimes className="sessions__empty-btn-icon" />
                Clear Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="sessions__grid">
          {filteredSessions.map((session: Session) => (
            <div key={session.id} className="sessions__card">
              <div className="sessions__card-header">
                <div className="sessions__card-info">
                  <h3 className="sessions__card-title">{session.title}</h3>
                  <p className="sessions__card-campaign">
                    {getCampaignTitle(session.campaignId)}
                  </p>
                </div>
                <span
                  className={`sessions__badge ${getStatusColor(session.status)}`}
                >
                  {session.status}
                </span>
              </div>

              <div className="sessions__card-content">
                <p className="sessions__card-description">
                  {session.description}
                </p>

                <div className="sessions__card-meta">
                  <div className="sessions__meta-item">
                    <FaCalendar className="sessions__meta-icon sessions__meta-icon--calendar" />
                    {formatDate(session.date)}
                  </div>
                  <div className="sessions__meta-item">
                    <FaClock className="sessions__meta-icon sessions__meta-icon--clock" />
                    {session.duration || 180} minutes
                  </div>
                  <div className="sessions__meta-item">
                    <FaUsers className="sessions__meta-icon sessions__meta-icon--users" />
                    {session.events?.length || 0} events
                  </div>
                </div>

                {session.summary && (
                  <div className="sessions__card-summary">
                    <p className="sessions__summary-text">{session.summary}</p>
                  </div>
                )}
              </div>

              <div className="sessions__card-actions">
                <button
                  className="sessions__action-btn sessions__action-btn--view"
                  onClick={() =>
                    navigate(
                      `/campaigns/${session.campaignId}/sessions/${session.id}`,
                    )
                  }
                >
                  View Session
                </button>

                {session.status === "planned" && (
                  <button
                    className="sessions__action-btn sessions__action-btn--play"
                    onClick={() => navigate(`/sessions/${session.id}/run`)}
                  >
                    <FaPlay className="sessions__action-btn-icon" />
                    Start Session
                  </button>
                )}

                <button
                  className="sessions__action-btn sessions__action-btn--edit"
                  onClick={() => navigate(`/sessions/${session.id}/edit`)}
                >
                  <FaEdit className="sessions__action-btn-icon" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessiones;
