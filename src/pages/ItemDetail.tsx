import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import "../css/ItemDetail.css";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaWeight,
  FaCoins,
  FaStar,
  FaShieldAlt,
  FaGem,
  FaFlask,
  FaTools,
  FaTimes,
  FaStore
} from "react-icons/fa";
import { GiSwordSmithing } from "react-icons/gi";
import type { Item } from "@/types/campaigns";

const ItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { items, campaigns, shops, deleteItem, loading } = useCampaigns();
  const [item, setItem] = useState<Item | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!loading && itemId) {
      const foundItem = items.find(i => i.id === itemId);
      if (foundItem) {
        setItem(foundItem);
      } else {
        navigate("/items");
      }
    }
  }, [itemId, items, loading, navigate]);

  const handleDelete = () => {
    if (item) {
      deleteItem(item.id);
      navigate("/items");
    }
  };

  const getCampaignTitle = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.title || "Unknown Campaign";
  };

  const getItemShops = () => {
    if (!item) return [];
    return shops.filter(shop => 
      shop.items.some(shopItem => shopItem.itemId === item.id)
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weapon":
        return <GiSwordSmithing className="item-detail__type-icon item-detail__type-icon--weapon" />;
      case "armor":
        return <FaShieldAlt className="item-detail__type-icon item-detail__type-icon--armor" />;
      case "treasure":
        return <FaGem className="item-detail__type-icon item-detail__type-icon--treasure" />;
      case "consumable":
        return <FaFlask className="item-detail__type-icon item-detail__type-icon--consumable" />;
      case "tool":
        return <FaTools className="item-detail__type-icon item-detail__type-icon--tool" />;
      case "magic":
        return <FaStar className="item-detail__type-icon item-detail__type-icon--magic" />;
      default:
        return <FaGem className="item-detail__type-icon item-detail__type-icon--other" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "item-detail__rarity--common";
      case "uncommon":
        return "item-detail__rarity--uncommon";
      case "rare":
        return "item-detail__rarity--rare";
      case "very rare":
        return "item-detail__rarity--very-rare";
      case "legendary":
        return "item-detail__rarity--legendary";
      case "artifact":
        return "item-detail__rarity--artifact";
      default:
        return "item-detail__rarity--common";
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="item-detail__loading">
          <div className="item-detail__loading-header"></div>
          <div className="item-detail__loading-content"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page-container">
        <div className="item-detail__error">
          <h2>Item Not Found</h2>
          <p>The item you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/items")}>
            <FaArrowLeft /> Back to Items
          </button>
        </div>
      </div>
    );
  }

  const itemShops = getItemShops();

  return (
    <div className="page-container">
      <div className="item-detail">
        <div className="item-detail__header">
          <button 
            className="item-detail__back-btn"
            onClick={() => navigate("/items")}
          >
            <FaArrowLeft className="item-detail__back-icon" />
            Back to Items
          </button>
          
          <div className="item-detail__actions">
            <button
              className="item-detail__edit-btn"
              onClick={() => navigate(`/items/${item.id}/edit`)}
            >
              <FaEdit className="item-detail__action-icon" />
              Edit Item
            </button>
            <button
              className="item-detail__delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaTrash className="item-detail__action-icon" />
              Delete
            </button>
          </div>
        </div>

        <div className="item-detail__content">
          <div className="item-detail__main">
            {item.imageUrl && (
              <div className="item-detail__image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
            )}

            <div className="item-detail__info">
              <div className="item-detail__title-section">
                <div className="item-detail__name-group">
                  {getTypeIcon(item.type)}
                  <h1 className="item-detail__title">{item.name}</h1>
                </div>
                <span className={`item-detail__rarity ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </span>
              </div>

              <p className="item-detail__campaign">
                Campaign: {getCampaignTitle(item.campaignId)}
              </p>

              <p className="item-detail__description">
                {item.description}
              </p>

              <div className="item-detail__metadata">
                <div className="item-detail__meta-item">
                  <FaCoins className="item-detail__meta-icon item-detail__meta-icon--gold" />
                  <div>
                    <strong>Value:</strong> {item.value} gp
                  </div>
                </div>

                <div className="item-detail__meta-item">
                  <FaWeight className="item-detail__meta-icon item-detail__meta-icon--weight" />
                  <div>
                    <strong>Weight:</strong> {item.weight} lbs
                  </div>
                </div>

                <div className="item-detail__meta-item">
                  <span className="item-detail__type-badge">
                    {item.type}
                  </span>
                </div>
              </div>

              {item.properties.length > 0 && (
                <div className="item-detail__properties">
                  <h3>Properties</h3>
                  <div className="item-detail__properties-list">
                    {item.properties.map((property) => (
                      <span key={property} className="item-detail__property-tag">
                        {property}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.notes && (
                <div className="item-detail__notes">
                  <h3>Notes</h3>
                  <p>{item.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="item-detail__availability">
            <div className="item-detail__availability-header">
              <FaStore className="item-detail__availability-icon" />
              <h2>Shop Availability</h2>
            </div>

            {itemShops.length === 0 ? (
              <div className="item-detail__no-shops">
                <p>This item is not currently available in any shops.</p>
              </div>
            ) : (
              <div className="item-detail__shops-list">
                {itemShops.map((shop) => {
                  const shopItem = shop.items.find(si => si.itemId === item.id);
                  return (
                    <div key={shop.id} className="item-detail__shop-card">
                      <div className="item-detail__shop-header">
                        <button
                          className="item-detail__shop-link"
                          onClick={() => navigate(`/shops/${shop.id}`)}
                        >
                          <h4>{shop.name}</h4>
                        </button>
                        <span className="item-detail__shop-type">{shop.type}</span>
                      </div>
                      
                      {shopItem && (
                        <div className="item-detail__shop-details">
                          <div className="item-detail__shop-price">
                            <FaCoins className="item-detail__shop-price-icon" />
                            <span>{shopItem.price} gp</span>
                          </div>
                          
                          <div className="item-detail__shop-quantity">
                            <strong>Qty:</strong> {shopItem.quantity}
                          </div>
                          
                          <div className={`item-detail__shop-status ${
                            shopItem.available 
                              ? "item-detail__shop-status--available" 
                              : "item-detail__shop-status--unavailable"
                          }`}>
                            {shopItem.available ? "Available" : "Out of Stock"}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <div className="item-detail__modal-overlay">
            <div className="item-detail__modal">
              <div className="item-detail__modal-header">
                <h3>Delete Item</h3>
                <button 
                  className="item-detail__modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="item-detail__modal-content">
                <p>Are you sure you want to delete "{item.name}"?</p>
                <p className="item-detail__modal-warning">
                  This action cannot be undone. The item will be removed from all shops and inventories.
                </p>
              </div>
              
              <div className="item-detail__modal-actions">
                <button
                  className="item-detail__modal-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="item-detail__modal-delete"
                  onClick={handleDelete}
                >
                  <FaTrash /> Delete Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
