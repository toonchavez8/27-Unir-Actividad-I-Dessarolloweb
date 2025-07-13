import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import ShopInventory from "@/components/ShopInventory/ShopInventory";
import "../css/ShopDetail.css";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaUser,
  FaBox,
  FaTimes,
  FaSearch,
  FaCheck,
  FaPlus
} from "react-icons/fa";
import type { Shop, ShopItem } from "@/types/campaigns";

const ShopDetail = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { shops, campaigns, npcs, locations, items, deleteShop, updateShop, loading } = useCampaigns();
  const [shop, setShop] = useState<Shop | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && shopId) {
      const foundShop = shops.find(s => s.id === shopId);
      if (foundShop) {
        setShop(foundShop);
      } else {
        navigate("/shops");
      }
    }
  }, [shopId, shops, loading, navigate]);

  const handleDelete = () => {
    if (shop) {
      deleteShop(shop.id);
      navigate("/shops");
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

  const handleUpdateShop = (shopId: string, updatedShop: Shop) => {
    updateShop(shopId, updatedShop);
    setShop(updatedShop);
  };

  // Add Item Modal Functions
  const getAvailableItems = () => {
    if (!shop) return [];
    const shopItemIds = new Set(shop.items.map(item => item.itemId));
    return items.filter(item => 
      item.campaignId === shop.campaignId && !shopItemIds.has(item.id)
    );
  };

  const getFilteredItems = () => {
    const availableItems = getAvailableItems();
    if (!searchQuery.trim()) return availableItems;
    
    const query = searchQuery.toLowerCase();
    return availableItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleAddSelectedItems = () => {
    if (!shop || selectedItems.size === 0) return;

    const newShopItems: ShopItem[] = Array.from(selectedItems).map(itemId => ({
      itemId,
      price: 0, // Default price, user can edit later
      quantity: 1, // Default quantity
      available: true
    }));

    const updatedShop = {
      ...shop,
      items: [...shop.items, ...newShopItems]
    };

    updateShop(shop.id, updatedShop);
    setShop(updatedShop);
    setShowAddItemModal(false);
    setSelectedItems(new Set());
    setSearchQuery("");
  };

  const handleCloseAddItemModal = () => {
    setShowAddItemModal(false);
    setSelectedItems(new Set());
    setSearchQuery("");
  };

  const getShopItems = () => {
    if (!shop) return [];
    return shop.items.map((shopItem) => {
      const item = items.find(i => i.id === shopItem.itemId);
      return { ...shopItem, item };
    }).filter((si) => si.item);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "weapons":
        return "shop-detail__badge--weapons";
      case "armor":
        return "shop-detail__badge--armor";
      case "magic":
        return "shop-detail__badge--magic";
      case "alchemy":
        return "shop-detail__badge--alchemy";
      case "general":
        return "shop-detail__badge--general";
      case "tavern":
        return "shop-detail__badge--tavern";
      case "blacksmith":
        return "shop-detail__badge--blacksmith";
      default:
        return "shop-detail__badge--default";
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="shop-detail__loading">
          <div className="shop-detail__loading-header"></div>
          <div className="shop-detail__loading-content"></div>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="page-container">
        <div className="shop-detail__error">
          <h2>Shop Not Found</h2>
          <p>The shop you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/shops")}>
            <FaArrowLeft /> Back to Shops
          </button>
        </div>
      </div>
    );
  }

  const shopItems = getShopItems();

  return (
    <div className="page-container">
      <div className="shop-detail">
        <div className="shop-detail__header">
          <button 
            className="shop-detail__back-btn"
            onClick={() => navigate("/shops")}
          >
            <FaArrowLeft className="shop-detail__back-icon" />
            Back to Shops
          </button>
          
          <div className="shop-detail__actions">
            <button
              className="shop-detail__edit-btn"
              onClick={() => navigate(`/shops/${shop.id}/edit`)}
            >
              <FaEdit className="shop-detail__action-icon" />
              Edit Shop
            </button>
            <button
              className="shop-detail__delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaTrash className="shop-detail__action-icon" />
              Delete
            </button>
          </div>
        </div>

        <div className="shop-detail__content">
          <div className="shop-detail__main">
            {shop.imageUrl && (
              <div className="shop-detail__image">
                <img src={shop.imageUrl} alt={shop.name} />
              </div>
            )}

            <div className="shop-detail__info">
              <div className="shop-detail__title-section">
                <h1 className="shop-detail__title">{shop.name}</h1>
                <span className={`shop-detail__badge ${getTypeColor(shop.type)}`}>
                  {shop.type}
                </span>
              </div>

              <p className="shop-detail__campaign">
                Campaign: {getCampaignTitle(shop.campaignId)}
              </p>

              <p className="shop-detail__description">
                {shop.description}
              </p>

              <div className="shop-detail__metadata">
                <div className="shop-detail__meta-item">
                  <FaUser className="shop-detail__meta-icon shop-detail__meta-icon--purple" />
                  <div>
                    <strong>Owner:</strong> {getOwnerName(shop.ownerId)}
                  </div>
                </div>

                <div className="shop-detail__meta-item">
                  <FaMapMarkerAlt className="shop-detail__meta-icon shop-detail__meta-icon--orange" />
                  <div>
                    <strong>Location:</strong> {getLocationName(shop.locationId)}
                  </div>
                </div>

                <div className="shop-detail__meta-item">
                  <FaBox className="shop-detail__meta-icon shop-detail__meta-icon--blue" />
                  <div>
                    <strong>Items:</strong> {shopItems.length} items available
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ShopInventory
            shop={shop}
            shopItems={shopItems}
            onUpdateShop={handleUpdateShop}
            onAddItems={() => setShowAddItemModal(true)}
          />
        </div>

        {/* Add Item Modal */}
        {showAddItemModal && (
          <div className="shop-detail__modal-overlay">
            <div className="shop-detail__modal shop-detail__modal--large">
              <div className="shop-detail__modal-header">
                <h3>Add Items to Inventory</h3>
                <button 
                  className="shop-detail__modal-close"
                  onClick={handleCloseAddItemModal}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="shop-detail__modal-content">
                <div className="shop-detail__add-item-search">
                  <div className="shop-detail__search-wrapper">
                    <FaSearch className="shop-detail__search-icon" />
                    <input
                      type="text"
                      placeholder="Search items by name, description, or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="shop-detail__search-input"
                    />
                  </div>
                </div>

                <div className="shop-detail__add-item-stats">
                  <p className="shop-detail__available-count">
                    {getFilteredItems().length} items available • {selectedItems.size} selected
                  </p>
                </div>

                <div className="shop-detail__add-item-list">
                  {getFilteredItems().length === 0 ? (
                    <div className="shop-detail__no-items">
                      <FaBox className="shop-detail__no-items-icon" />
                      <h4>No Items Available</h4>
                      <p>
                        {getAvailableItems().length === 0 
                          ? "All items from this campaign are already in the shop inventory."
                          : "No items match your search criteria."
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="shop-detail__add-item-items-grid">
                      {getFilteredItems().map((item) => (
                        <button 
                          key={item.id}
                          className={`shop-detail__add-item-card ${
                            selectedItems.has(item.id) ? 'shop-detail__add-item-card--selected' : ''
                          }`}
                          onClick={() => handleItemSelect(item.id)}
                        >
                          <div className="shop-detail__item-card-header">
                            <div className="shop-detail__item-card-select">
                              <div className={`shop-detail__checkbox ${
                                selectedItems.has(item.id) ? 'shop-detail__checkbox--checked' : ''
                              }`}>
                                {selectedItems.has(item.id) && <FaCheck />}
                              </div>
                            </div>
                            <h4 className="shop-detail__item-card-name">{item.name}</h4>
                          </div>
                          
                          <div className="shop-detail__item-card-content">
                            <p className="shop-detail__item-card-description">
                              {item.description}
                            </p>
                            <div className="shop-detail__item-card-meta">
                              <span className="shop-detail__item-card-type">
                                {item.type}
                              </span>
                              {item.rarity && (
                                <span className={`shop-detail__item-card-rarity shop-detail__item-card-rarity--${item.rarity.toLowerCase()}`}>
                                  {item.rarity}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="shop-detail__modal-actions">
                <button
                  className="shop-detail__modal-cancel"
                  onClick={handleCloseAddItemModal}
                >
                  Cancel
                </button>
                <button
                  className="shop-detail__modal-add"
                  onClick={handleAddSelectedItems}
                  disabled={selectedItems.size === 0}
                >
                  <FaPlus /> Add {selectedItems.size} Item{selectedItems.size !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="shop-detail__modal-overlay">
            <div className="shop-detail__modal">
              <div className="shop-detail__modal-header">
                <h3>Delete Shop</h3>
                <button 
                  className="shop-detail__modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="shop-detail__modal-content">
                <p>Are you sure you want to delete "{shop.name}"?</p>
                <p className="shop-detail__modal-warning">
                  This action cannot be undone. All inventory data will be lost.
                </p>
              </div>
              
              <div className="shop-detail__modal-actions">
                <button
                  className="shop-detail__modal-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="shop-detail__modal-delete"
                  onClick={handleDelete}
                >
                  <FaTrash /> Delete Shop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;
