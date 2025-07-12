import { useState } from "react";
import { useNavigate } from "react-router";
import { FaPlus, FaSearch, FaFilter, FaUsers, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useCampaigns } from "@/hooks/useCampaigns";
import type { NPC } from "@/types/campaigns";
import "@/css/Npcs.css";

export function Npcs() {
  const navigate = useNavigate();
  const { npcs, campaigns, loading } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [raceFilter, setRaceFilter] = useState<string>("all");

  const filteredNPCs = npcs.filter((npc) => {
    const matchesSearch =
      npc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      npc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      npc.race.toLowerCase().includes(searchQuery.toLowerCase()) ||
      npc.personality?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || npc.status === statusFilter;
    const matchesCampaign = campaignFilter === "all" || npc.campaignId === campaignFilter;
    const matchesRace = raceFilter === "all" || npc.race === raceFilter;

    return matchesSearch && matchesStatus && matchesCampaign && matchesRace;
  });

  const statusCounts = {
    all: npcs.length,
    alive: npcs.filter((npc) => npc.status === "alive").length,
    dead: npcs.filter((npc) => npc.status === "dead").length,
    missing: npcs.filter((npc) => npc.status === "missing").length,
    unknown: npcs.filter((npc) => npc.status === "unknown").length,
  };

  const uniqueRaces = [...new Set(npcs.map((npc) => npc.race))].sort((a, b) => a.localeCompare(b));

  const getStatusModifier = (status: string) => {
    switch (status) {
      case "alive":
        return "npcs-card__badge--alive";
      case "dead":
        return "npcs-card__badge--dead";
      case "missing":
        return "npcs-card__badge--missing";
      case "unknown":
        return "npcs-card__badge--unknown";
      default:
        return "npcs-card__badge--default";
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleCampaignFilterChange = (campaignId: string) => {
    setCampaignFilter(campaignId);
  };

  const handleRaceFilterChange = (race: string) => {
    setRaceFilter(race);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCampaignFilter("all");
    setRaceFilter("all");
  };

  const handleNPCClick = (npc: NPC) => {
    navigate(`/campaigns/${npc.campaignId}/npcs/${npc.id}`);
  };

  if (loading) {
    const loadingItems = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5", "skeleton-6"];
    
    return (
      <div className="npcs-page">
        <div className="npcs-page__loading">
          <div className="npcs-page__loading-header">
            <div className="npcs-page__loading-title"></div>
            <div className="npcs-page__loading-description"></div>
          </div>
          <div className="npcs-page__loading-content">
            <div className="npcs-page__loading-filters"></div>
            <div className="npcs-page__loading-grid">
              {loadingItems.map((id) => (
                <div key={id} className="npcs-page__loading-card"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="npcs-page page-container">
      <header className="npcs-page__header">
        <div className="npcs-page__title-section">
          <h1 className="npcs-page__title">NPCs</h1>
          <p className="npcs-page__description">Manage your non-player characters</p>
        </div>
        <button
          className="npcs-page__new-button"
          onClick={() => navigate("/npcs/create/new")}
          aria-label="Create new NPC"
        >
          <FaPlus className="npcs-page__new-icon" />
          New NPC
        </button>
      </header>

      <div className="npcs-page__filters">
        <div className="npcs-page__search">
          <FaSearch className="npcs-page__search-icon" />
          <input
            type="text"
            className="npcs-page__search-input"
            placeholder="Search NPCs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search NPCs"
          />
        </div>

        <div className="npcs-page__filter-group">
          <div className="npcs-page__filter">
            <FaFilter className="npcs-page__filter-icon" />
            <select
              className="npcs-page__filter-select"
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="alive">Alive ({statusCounts.alive})</option>
              <option value="dead">Dead ({statusCounts.dead})</option>
              <option value="missing">Missing ({statusCounts.missing})</option>
              <option value="unknown">Unknown ({statusCounts.unknown})</option>
            </select>
          </div>

          <div className="npcs-page__filter">
            <select
              className="npcs-page__filter-select"
              value={raceFilter}
              onChange={(e) => handleRaceFilterChange(e.target.value)}
              aria-label="Filter by race"
            >
              <option value="all">All Races</option>
              {uniqueRaces.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          <div className="npcs-page__filter">
            <select
              className="npcs-page__filter-select"
              value={campaignFilter}
              onChange={(e) => handleCampaignFilterChange(e.target.value)}
              aria-label="Filter by campaign"
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

      {filteredNPCs.length === 0 ? (
        <div className="npcs-page__empty">
          <div className="npcs-page__empty-icon">
            <FaUsers />
          </div>
          {npcs.length === 0 ? (
            <>
              <h2 className="npcs-page__empty-title">No NPCs created yet</h2>
              <p className="npcs-page__empty-description">
                Create your first NPC to get started with character management.
              </p>
              <button
                className="npcs-page__empty-button"
                onClick={() => navigate("/npcs/create/new")}
              >
                Create Your First NPC
              </button>
            </>
          ) : (
            <>
              <h2 className="npcs-page__empty-title">No NPCs match your search</h2>
              <p className="npcs-page__empty-description">
                Try adjusting your search criteria or clear the filters.
              </p>
              <button
                className="npcs-page__empty-button npcs-page__empty-button--secondary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="npcs-page__grid">
          {filteredNPCs.map((npc) => (
            <button
              key={npc.id}
              className="npcs-card"
              onClick={() => handleNPCClick(npc)}
              aria-label={`View NPC: ${npc.name}`}
            >
              {npc.imageUrl && (
                <div className="npcs-card__image">
                  <img
                    src={npc.imageUrl}
                    alt={`${npc.name} portrait`}
                    className="npcs-card__img"
                  />
                </div>
              )}

              <div className="npcs-card__header">
                <div className="npcs-card__title-section">
                  <h3 className="npcs-card__name">{npc.name}</h3>
                  <p className="npcs-card__campaign">{getCampaignTitle(npc.campaignId)}</p>
                </div>
                <span className={`npcs-card__badge ${getStatusModifier(npc.status)}`}>
                  {npc.status}
                </span>
              </div>

              <div className="npcs-card__content">
                <div className="npcs-card__tags">
                  <span className="npcs-card__tag npcs-card__tag--race">{npc.race}</span>
                  {npc.class && (
                    <span className="npcs-card__tag npcs-card__tag--class">{npc.class}</span>
                  )}
                </div>

                <p className="npcs-card__description">{npc.description}</p>

                {npc.location && (
                  <div className="npcs-card__location">
                    <FaMapMarkerAlt className="npcs-card__location-icon" />
                    <span className="npcs-card__location-text">{npc.location}</span>
                  </div>
                )}

                {npc.personality && (
                  <div className="npcs-card__personality">
                    <div className="npcs-card__personality-header">
                      <FaHeart className="npcs-card__personality-icon" />
                      <span className="npcs-card__personality-label">Personality</span>
                    </div>
                    <p className="npcs-card__personality-text">{npc.personality}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Npcs;
