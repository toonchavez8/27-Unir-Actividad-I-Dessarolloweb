import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/Shops.css";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaStore,
  FaMapMarkerAlt,
  FaUser,
  FaBox,
  FaTimes,
  FaCoins
} from "react-icons/fa";
import type { Shop } from "@/types/campaigns";

const Shops = () => {
  const navigate = useNavigate();
  const { shops, campaigns, npcs, locations, items, loading } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const filteredShops = shops.filter((shop: Shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || shop.type === typeFilter;
    const matchesCampaign =
      campaignFilter === "all" || shop.campaignId === campaignFilter;

    return matchesSearch && matchesType && matchesCampaign;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "weapons":
        return "shops__badge--weapons";
      case "armor":
        return "shops__badge--armor";
      case "magic":
        return "shops__badge--magic";
      case "alchemy":
        return "shops__badge--alchemy";
      case "general":
        return "shops__badge--general";
      case "tavern":
        return "shops__badge--tavern";
      case "blacksmith":
        return "shops__badge--blacksmith";
      default:
        return "shops__badge--default";
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const getOwnerName = (ownerId?: string) => {
    if (!ownerId) return "No Owner";
    const npc = npcs.find(n => n.id === ownerId);
    return npc?.name || "Unknown Owner";
  };

  const getLocationName = (locationId?: string) => {
    if (!locationId) return "No Location";
    const location = locations.find(l => l.id === locationId);
    return location?.name || "Unknown Location";
  };

  const getShopItems = (shop: Shop) => {
    return shop.items.map((shopItem) => {
      const item = items.find(i => i.id === shopItem.itemId);
      return { ...shopItem, item };
    }).filter((si) => si.item);
  };

  const uniqueTypes = [...new Set(shops.map(shop => shop.type))].sort((a, b) => a.localeCompare(b));

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setCampaignFilter("all");
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="shops">
          <div className="shops__loading">
            <div className="shops__loading-header">
              <div className="shops__loading-title"></div>
              <div className="shops__loading-description"></div>
            </div>
            <div className="shops__loading-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={`loading-${i}`} className="shops__loading-card"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="shops">
        <div className="shops__header">
          <div className="shops__header-content">
            <h1 className="page-title">Shops</h1>
            <p className="page-description">
              Manage shops, merchants, and their inventories
            </p>
          </div>
          <button
            className="shops__new-btn"
            onClick={() => navigate("/shops/create/new")}
          >
            <FaPlus className="shops__new-btn-icon" />
            New Shop
          </button>
        </div>

        <div className="shops__filters">
          <div className="shops__search">
            <FaSearch className="shops__search-icon" />
            <input
              type="text"
              placeholder="Search shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shops__search-input"
            />
          </div>

          <div className="shops__filter-group">
            <div className="shops__filter">
              <FaFilter className="shops__filter-icon" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="shops__filter-select"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="shops__filter">
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="shops__filter-select"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </option>
                ))}
              </select>
            </div>

            {(searchQuery || typeFilter !== "all" || campaignFilter !== "all") && (
              <button
                className="shops__clear-filters"
                onClick={clearFilters}
                title="Clear all filters"
              >
                <FaTimes className="shops__clear-filters-icon" />
                Clear
              </button>
            )}
          </div>
        </div>

        {filteredShops.length === 0 ? (
          <div className="shops__empty">
            <div className="shops__empty-icon">
              <FaStore />
            </div>
            {shops.length === 0 ? (
              <>
                <h3 className="shops__empty-title">No Shops Yet</h3>
                <p className="shops__empty-message">
                  Create your first shop to start managing merchant inventories
                </p>
                <button
                  className="shops__empty-button"
                  onClick={() => navigate("/shops/create/new")}
                >
                  <FaPlus className="shops__empty-button-icon" />
                  Create Your First Shop
                </button>
              </>
            ) : (
              <>
                <h3 className="shops__empty-title">No Matching Shops</h3>
                <p className="shops__empty-message">
                  No shops match your current search and filter criteria
                </p>
                <button
                  className="shops__empty-button shops__empty-button--secondary"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="shops__grid">
            {filteredShops.map((shop) => {
              const shopItems = getShopItems(shop);

              return (
                <button
                  key={shop.id}
                  className="shops__card"
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  type="button"
                >
                  {shop.imageUrl && (
                    <div className="shops__card-image">
                      <img
                        src={shop.imageUrl}
                        alt={shop.name}
                        className="shops__card-img"
                      />
                    </div>
                  )}

                  <div className="shops__card-header">
                    <div className="shops__card-info">
                      <h3 className="shops__card-title">{shop.name}</h3>
                      <p className="shops__card-campaign">
                        {getCampaignTitle(shop.campaignId)}
                      </p>
                    </div>
                    <span className={`shops__badge ${getTypeColor(shop.type)}`}>
                      {shop.type}
                    </span>
                  </div>

                  <div className="shops__card-content">
                    <p className="shops__card-description">
                      {shop.description}
                    </p>

                    <div className="shops__card-details">
                      <div className="shops__card-detail">
                        <FaUser className="shops__card-detail-icon shops__card-detail-icon--purple" />
                        <span className="shops__card-detail-text">
                          {getOwnerName(shop.ownerId)}
                        </span>
                      </div>

                      <div className="shops__card-detail">
                        <FaMapMarkerAlt className="shops__card-detail-icon shops__card-detail-icon--orange" />
                        <span className="shops__card-detail-text">
                          {getLocationName(shop.locationId)}
                        </span>
                      </div>

                      <div className="shops__card-detail">
                        <FaBox className="shops__card-detail-icon shops__card-detail-icon--blue" />
                        <span className="shops__card-detail-text">
                          {shopItems.length} item{shopItems.length !== 1 ? "s" : ""} available
                        </span>
                      </div>
                    </div>

                    {shopItems.length > 0 && (
                      <div className="shops__card-items">
                        <h4 className="shops__card-items-title">Featured Items</h4>
                        <div className="shops__card-items-list">
                          {shopItems.slice(0, 3).map((shopItem) => (
                            <div key={shopItem.itemId} className="shops__card-item">
                              <span className="shops__card-item-name">
                                {shopItem.item?.name}
                              </span>
                              <span className="shops__card-item-price">
                                <FaCoins className="shops__card-item-price-icon" />
                                {shopItem.price}gp
                              </span>
                            </div>
                          ))}
                          {shopItems.length > 3 && (
                            <p className="shops__card-items-more">
                              +{shopItems.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shops;
