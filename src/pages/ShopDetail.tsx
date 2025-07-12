import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/ShopDetail.css";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaUser,
  FaBox,
  FaCoins,
  FaPlus,
  FaEye,
  FaTimes
} from "react-icons/fa";
import type { Shop } from "@/types/campaigns";

const ShopDetail = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { shops, campaigns, npcs, locations, items, deleteShop, loading } = useCampaigns();
  const [shop, setShop] = useState<Shop | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

          <div className="shop-detail__inventory">
            <div className="shop-detail__inventory-header">
              <h2>Inventory</h2>
              <button
                className="shop-detail__add-item-btn"
                onClick={() => navigate(`/shops/${shop.id}/items/new`)}
              >
                <FaPlus className="shop-detail__add-item-icon" />
                Add Item
              </button>
            </div>

            {shopItems.length === 0 ? (
              <div className="shop-detail__empty-inventory">
                <FaBox className="shop-detail__empty-icon" />
                <h3>No Items Yet</h3>
                <p>This shop doesn't have any items in its inventory.</p>
                <button
                  className="shop-detail__add-first-item"
                  onClick={() => navigate(`/shops/${shop.id}/items/new`)}
                >
                  <FaPlus /> Add First Item
                </button>
              </div>
            ) : (
              <div className="shop-detail__items-grid">
                {shopItems.map((shopItem) => (
                  <div key={shopItem.itemId} className="shop-detail__item-card">
                    <div className="shop-detail__item-header">
                      <h4 className="shop-detail__item-name">
                        {shopItem.item?.name}
                      </h4>
                      <button
                        className="shop-detail__item-view"
                        onClick={() => navigate(`/items/${shopItem.itemId}`)}
                        title="View item details"
                      >
                        <FaEye />
                      </button>
                    </div>
                    
                    <p className="shop-detail__item-description">
                      {shopItem.item?.description}
                    </p>
                    
                    <div className="shop-detail__item-details">
                      <div className="shop-detail__item-price">
                        <FaCoins className="shop-detail__price-icon" />
                        <span>{shopItem.price} gp</span>
                      </div>
                      
                      <div className="shop-detail__item-quantity">
                        <strong>Qty:</strong> {shopItem.quantity}
                      </div>
                      
                      <div className={`shop-detail__item-status ${
                        shopItem.available 
                          ? "shop-detail__item-status--available" 
                          : "shop-detail__item-status--unavailable"
                      }`}>
                        {shopItem.available ? "Available" : "Out of Stock"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

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
