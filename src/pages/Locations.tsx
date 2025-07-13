import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/Locations.css";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaUsers,
  FaHistory,
  FaTimes
} from "react-icons/fa";

const Locations = () => {
  const navigate = useNavigate();
  const { locations, campaigns, loading } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || location.type === typeFilter;
    const matchesCampaign = campaignFilter === "all" || location.campaignId === campaignFilter;
    
    return matchesSearch && matchesType && matchesCampaign;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "city":
        return "locations__badge--city";
      case "town":
        return "locations__badge--town";
      case "village":
        return "locations__badge--village";
      case "dungeon":
        return "locations__badge--dungeon";
      case "wilderness":
        return "locations__badge--wilderness";
      case "landmark":
        return "locations__badge--landmark";
      case "building":
        return "locations__badge--building";
      default:
        return "locations__badge--default";
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const uniqueTypes = [...new Set(locations.map(location => location.type))].sort((a, b) => a.localeCompare(b));

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCampaignFilter("all");
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="locations__loading">
          <div className="locations__loading-header"></div>
          <div className="locations__loading-filters"></div>
          <div className="locations__loading-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={`loading-${i}`} className="locations__loading-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="locations">
        <div className="locations__header">
          <div className="locations__header-content">
            <h1 className="locations__title">Locations</h1>
            <p className="locations__description">
              Explore and manage your world's locations
            </p>
          </div>
          <button 
            className="locations__new-btn"
            onClick={() => navigate("/locations/create/new")}
          >
            <FaPlus className="locations__new-icon" />
            New Location
          </button>
        </div>

        <div className="locations__filters">
          <div className="locations__search">
            <FaSearch className="locations__search-icon" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="locations__search-input"
            />
          </div>
          
          <div className="locations__filter-group">
            <div className="locations__filter">
              <FaFilter className="locations__filter-icon" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="locations__filter-select"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="locations__filter">
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="locations__filter-select"
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

        {filteredLocations.length === 0 ? (
          <div className="locations__empty">
            <div className="locations__empty-icon">
              <FaMapMarkerAlt />
            </div>
            {locations.length === 0 ? (
              <>
                <h3 className="locations__empty-title">No locations created yet</h3>
                <p className="locations__empty-text">
                  Create your first location to start building your world
                </p>
                <button 
                  className="locations__empty-btn"
                  onClick={() => navigate("/locations/create/new")}
                >
                  Create Your First Location
                </button>
              </>
            ) : (
              <>
                <h3 className="locations__empty-title">No locations found</h3>
                <p className="locations__empty-text">
                  No locations match your search criteria
                </p>
                <button 
                  className="locations__clear-btn"
                  onClick={clearFilters}
                >
                  <FaTimes className="locations__clear-icon" />
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="locations__grid">
            {filteredLocations.map((location) => (
              <button 
                key={location.id}
                type="button"
                className="locations__card"
                onClick={() => {
                  navigate(`/locations/${location.id}`);
                }}
              >
                {location.imageUrl && (
                  <div className="locations__card-image">
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      className="locations__card-img"
                    />
                  </div>
                )}
                
                <div className="locations__card-header">
                  <div className="locations__card-title-section">
                    <h3 className="locations__card-title">{location.name}</h3>
                    <p className="locations__card-campaign">
                      {getCampaignTitle(location.campaignId)}
                    </p>
                  </div>
                  <span className={`locations__badge ${getTypeColor(location.type)}`}>
                    {location.type}
                  </span>
                </div>
                
                <div className="locations__card-content">
                  <p className="locations__card-description">
                    {location.description}
                  </p>
                  
                  {location.inhabitants.length > 0 && (
                    <div className="locations__card-meta">
                      <FaUsers className="locations__card-meta-icon locations__card-meta-icon--users" />
                      <span className="locations__card-meta-text">
                        {location.inhabitants.length} inhabitant{location.inhabitants.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {location.history && (
                    <div className="locations__card-history">
                      <div className="locations__card-history-header">
                        <FaHistory className="locations__card-history-icon" />
                        <span className="locations__card-history-title">History</span>
                      </div>
                      <p className="locations__card-history-text">
                        {location.history}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
