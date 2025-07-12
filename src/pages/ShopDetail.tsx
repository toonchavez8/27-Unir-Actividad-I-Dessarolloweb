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
  FaTimes,
  FaSave,
  FaUndo
} from "react-icons/fa";
import type { Shop, ShopItem } from "@/types/campaigns";

const ShopDetail = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { shops, campaigns, npcs, locations, items, deleteShop, updateShop, loading } = useCampaigns();
  const [shop, setShop] = useState<Shop | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ShopItem>>({});

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

  const handleEditItem = (itemId: string, currentItem: ShopItem) => {
    setEditingItem(itemId);
    setEditValues({
      price: currentItem.price,
      quantity: currentItem.quantity,
      available: currentItem.available
    });
  };

  const handleSaveEdit = (itemId: string) => {
    if (!shop) return;
    
    const updatedItems = shop.items.map(item => 
      item.itemId === itemId 
        ? { ...item, ...editValues }
        : item
    );
    
    const updatedShop = { ...shop, items: updatedItems };
    updateShop(shop.id, updatedShop);
    setShop(updatedShop);
    setEditingItem(null);
    setEditValues({});
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValues({});
  };

  const handleDeleteItem = (itemId: string) => {
    if (!shop) return;
    
    const updatedItems = shop.items.filter(item => item.itemId !== itemId);
    const updatedShop = { ...shop, items: updatedItems };
    updateShop(shop.id, updatedShop);
    setShop(updatedShop);
  };

  const handleEditValueChange = (field: keyof ShopItem, value: string | number | boolean) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
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
              <div className="shop-detail__inventory-table-wrapper">
                <table className="shop-detail__inventory-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Price (gp)</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopItems.map((shopItem) => (
                      <tr key={shopItem.itemId} className="shop-detail__inventory-row">
                        <td className="shop-detail__item-name">
                          <button
                            className="shop-detail__item-link"
                            onClick={() => navigate(`/items/${shopItem.itemId}`)}
                            title="View item details"
                          >
                            <FaEye className="shop-detail__item-view-icon" />
                            {shopItem.item?.name}
                          </button>
                        </td>
                        
                        <td className="shop-detail__item-description">
                          {shopItem.item?.description}
                        </td>
                        
                        <td className="shop-detail__item-price">
                          {editingItem === shopItem.itemId ? (
                            <input
                              type="number"
                              value={editValues.price || 0}
                              onChange={(e) => handleEditValueChange('price', parseFloat(e.target.value) || 0)}
                              className="shop-detail__edit-input shop-detail__edit-input--price"
                              min="0"
                              step="0.01"
                            />
                          ) : (
                            <span className="shop-detail__price-display">
                              <FaCoins className="shop-detail__price-icon" />
                              {shopItem.price}
                            </span>
                          )}
                        </td>
                        
                        <td className="shop-detail__item-quantity">
                          {editingItem === shopItem.itemId ? (
                            <input
                              type="number"
                              value={editValues.quantity || 0}
                              onChange={(e) => handleEditValueChange('quantity', parseInt(e.target.value) || 0)}
                              className="shop-detail__edit-input shop-detail__edit-input--quantity"
                              min="0"
                            />
                          ) : (
                            <span>{shopItem.quantity}</span>
                          )}
                        </td>
                        
                        <td className="shop-detail__item-status">
                          {editingItem === shopItem.itemId ? (
                            <select
                              value={editValues.available ? 'true' : 'false'}
                              onChange={(e) => handleEditValueChange('available', e.target.value === 'true')}
                              className="shop-detail__edit-select"
                            >
                              <option value="true">Available</option>
                              <option value="false">Out of Stock</option>
                            </select>
                          ) : (
                            <span className={`shop-detail__status-badge ${
                              shopItem.available 
                                ? "shop-detail__status-badge--available" 
                                : "shop-detail__status-badge--unavailable"
                            }`}>
                              {shopItem.available ? "Available" : "Out of Stock"}
                            </span>
                          )}
                        </td>
                        
                        <td className="shop-detail__item-actions">
                          {editingItem === shopItem.itemId ? (
                            <div className="shop-detail__edit-actions">
                              <button
                                className="shop-detail__save-btn"
                                onClick={() => handleSaveEdit(shopItem.itemId)}
                                title="Save changes"
                              >
                                <FaSave />
                              </button>
                              <button
                                className="shop-detail__cancel-btn"
                                onClick={handleCancelEdit}
                                title="Cancel edit"
                              >
                                <FaUndo />
                              </button>
                            </div>
                          ) : (
                            <div className="shop-detail__view-actions">
                              <button
                                className="shop-detail__edit-btn-small"
                                onClick={() => handleEditItem(shopItem.itemId, shopItem)}
                                title="Edit item"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="shop-detail__delete-btn-small"
                                onClick={() => handleDeleteItem(shopItem.itemId)}
                                title="Remove from shop"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
