import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/Items.css";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaBox,
  FaCoins,
  FaWeight,
  FaTimes
} from "react-icons/fa";

const Items = () => {
  const navigate = useNavigate();
  const { items, campaigns, loading } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesRarity = rarityFilter === "all" || item.rarity === rarityFilter;
    const matchesCampaign = campaignFilter === "all" || item.campaignId === campaignFilter;
    
    return matchesSearch && matchesType && matchesRarity && matchesCampaign;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "weapon":
        return "items__badge--weapon";
      case "armor":
        return "items__badge--armor";
      case "magic":
        return "items__badge--magic";
      case "consumable":
        return "items__badge--consumable";
      case "tool":
        return "items__badge--tool";
      case "treasure":
        return "items__badge--treasure";
      default:
        return "items__badge--default";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "items__rarity--common";
      case "uncommon":
        return "items__rarity--uncommon";
      case "rare":
        return "items__rarity--rare";
      case "very rare":
        return "items__rarity--very-rare";
      case "legendary":
        return "items__rarity--legendary";
      case "artifact":
        return "items__rarity--artifact";
      default:
        return "items__rarity--common";
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const uniqueTypes = [...new Set(items.map(item => item.type))].sort((a, b) => a.localeCompare(b));
  const uniqueRarities = ["common", "uncommon", "rare", "very rare", "legendary", "artifact"];

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setRarityFilter("all");
    setCampaignFilter("all");
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="items__loading">
          <div className="items__loading-header"></div>
          <div className="items__loading-filters"></div>
          <div className="items__loading-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={`loading-${i}`} className="items__loading-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="items">
        <div className="items__header">
          <div className="items__header-content">
            <h1 className="items__title">Items</h1>
            <p className="items__description">
              Create and manage magical items, weapons, and treasures
            </p>
          </div>
          <button 
            className="items__new-btn"
            onClick={() => navigate("/items/create/new")}
          >
            <FaPlus className="items__new-icon" />
            New Item
          </button>
        </div>

        <div className="items__filters">
          <div className="items__search">
            <FaSearch className="items__search-icon" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="items__search-input"
            />
          </div>
          
          <div className="items__filter-group">
            <div className="items__filter">
              <FaFilter className="items__filter-icon" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="items__filter-select"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="items__filter">
              <select
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value)}
                className="items__filter-select"
              >
                <option value="all">All Rarities</option>
                {uniqueRarities.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="items__filter">
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="items__filter-select"
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

        {filteredItems.length === 0 ? (
          <div className="items__empty">
            <div className="items__empty-icon">
              <FaBox />
            </div>
            {items.length === 0 ? (
              <>
                <h3 className="items__empty-title">No items created yet</h3>
                <p className="items__empty-text">
                  Create your first magical item to start building your inventory
                </p>
                <button 
                  className="items__empty-btn"
                  onClick={() => navigate("/items/create/new")}
                >
                  Create Your First Item
                </button>
              </>
            ) : (
              <>
                <h3 className="items__empty-title">No items found</h3>
                <p className="items__empty-text">
                  No items match your search criteria
                </p>
                <button 
                  className="items__clear-btn"
                  onClick={clearFilters}
                >
                  <FaTimes className="items__clear-icon" />
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="items__grid">
            {filteredItems.map((item) => (
              <button 
                key={item.id}
                className="items__card"
                onClick={() => navigate(`/items/${item.id}`)}
              >
                {item.imageUrl && (
                  <div className="items__card-image">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="items__card-img"
                    />
                  </div>
                )}
                
                <div className="items__card-header">
                  <div className="items__card-title-section">
                    <h3 className="items__card-title">{item.name}</h3>
                    <p className="items__card-campaign">
                      {getCampaignTitle(item.campaignId)}
                    </p>
                  </div>
                  <div className="items__card-badges">
                    <span className={`items__badge ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <span className={`items__rarity ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="items__card-content">
                  <p className="items__card-description">
                    {item.description}
                  </p>
                  
                  <div className="items__card-stats">
                    <div className="items__card-stat">
                      <div className="items__card-stat-label">
                        <FaCoins className="items__card-stat-icon items__card-stat-icon--value" />
                        <span>Value</span>
                      </div>
                      <span className="items__card-stat-value">{item.value} gp</span>
                    </div>
                    <div className="items__card-stat">
                      <div className="items__card-stat-label">
                        <FaWeight className="items__card-stat-icon items__card-stat-icon--weight" />
                        <span>Weight</span>
                      </div>
                      <span className="items__card-stat-value">{item.weight} lbs</span>
                    </div>
                  </div>

                  {item.properties.length > 0 && (
                    <div className="items__card-properties">
                      <h4 className="items__card-properties-title">Properties</h4>
                      <div className="items__card-properties-list">
                        {item.properties.slice(0, 3).map((property) => (
                          <span key={property} className="items__property-tag">
                            {property}
                          </span>
                        ))}
                        {item.properties.length > 3 && (
                          <span className="items__property-tag items__property-tag--more">
                            +{item.properties.length - 3} more
                          </span>
                        )}
                      </div>
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

export default Items;
