import { useState } from "react";
import { useNavigate } from "react-router";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { useCampaigns } from "@/hooks/useCampaigns";
import "@/css/Campaigns.css";

export function Campaigns() {
  const navigate = useNavigate();
  const { campaigns, loading } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.worldName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    planning: campaigns.filter((c) => c.status === "planning").length,
    completed: campaigns.filter((c) => c.status === "completed").length,
    paused: campaigns.filter((c) => c.status === "paused").length,
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  if (loading) {
    return (
      <div className="campaigns-page">
        <div className="campaigns-page__loading">
          <div className="campaigns-page__loading-header">
            <div className="campaigns-page__loading-title"></div>
            <div className="campaigns-page__loading-description"></div>
          </div>
          <div className="campaigns-page__loading-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={`skeleton-card-${i + 1}`}
                className="campaigns-page__loading-card"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="campaigns-page page-container">
      <div className="campaigns-page__title-section ">
        <h1 className="campaigns-page__title">Campaigns</h1>
        <p className="campaigns-page__description">
          Manage your D&D campaigns and adventures
        </p>
      </div>

      <div className="campaigns-page__filters ">
        <div className="campaigns-page__search">
          <FaSearch className="campaigns-page__search-icon" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="campaigns-page__search-input"
          />
        </div>
        <div className="campaigns-page__status-filter">
          <FaFilter className="campaigns-page__filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="campaigns-page__status-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          className="campaigns-page__new-button"
          onClick={() => navigate("/campaigns/new")}
        >
          <FaPlus className="campaigns-page__new-button-icon" />
          New Campaign
        </button>
      </div>

      <div className="campaigns-page__status-badges">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            className={`campaigns-page__status-badge ${
              statusFilter === status
                ? "campaigns-page__status-badge--active"
                : ""
            }`}
            onClick={() => handleStatusFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="campaigns-page__empty">
          <div className="campaigns-page__empty-icon">
            <FaSearch />
          </div>
          {campaigns.length === 0 ? (
            <div className="campaigns-page__empty-content">
              <p className="campaigns-page__empty-text">
                No campaigns created yet
              </p>
              <button
                className="campaigns-page__empty-button"
                onClick={() => navigate("/campaigns/new")}
              >
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="campaigns-page__empty-content">
              <p className="campaigns-page__empty-text">
                No campaigns match your search criteria
              </p>
              <button
                className="campaigns-page__clear-button"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="campaigns-page__grid">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Campaigns;
