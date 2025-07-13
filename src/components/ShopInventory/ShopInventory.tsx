import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaBox,
  FaCoins,
  FaPlus,
  FaEye,
  FaSave,
  FaUndo
} from "react-icons/fa";
import type { Shop, ShopItem } from "@/types/campaigns";
import "./ShopInventory.css";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity?: string;
}

interface ShopInventoryProps {
  shop: Shop;
  shopItems: Array<ShopItem & { item?: Item }>;
  onUpdateShop: (shopId: string, updatedShop: Shop) => void;
  onAddItems: () => void;
}

const ShopInventory = ({
  shop,
  shopItems,
  onUpdateShop,
  onAddItems
}: ShopInventoryProps) => {
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ShopItem>>({});

  const handleEditItem = (itemId: string, currentItem: ShopItem) => {
    setEditingItem(itemId);
    setEditValues({
      price: currentItem.price,
      quantity: currentItem.quantity,
      available: currentItem.available
    });
  };

  const handleSaveEdit = (itemId: string) => {
    const updatedItems = shop.items.map(item => 
      item.itemId === itemId 
        ? { ...item, ...editValues }
        : item
    );
    
    const updatedShop = { ...shop, items: updatedItems };
    onUpdateShop(shop.id, updatedShop);
    setEditingItem(null);
    setEditValues({});
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValues({});
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = shop.items.filter(item => item.itemId !== itemId);
    const updatedShop = { ...shop, items: updatedItems };
    onUpdateShop(shop.id, updatedShop);
  };

  const handleEditValueChange = (field: keyof ShopItem, value: string | number | boolean) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="shop-inventory">
      <div className="shop-inventory__header">
        <h2>Inventory</h2>
        <button
          className="shop-inventory__add-item-btn"
          onClick={onAddItems}
        >
          <FaPlus className="shop-inventory__add-item-icon" />
          Add Item
        </button>
      </div>

      {shopItems.length === 0 ? (
        <div className="shop-inventory__empty">
          <FaBox className="shop-inventory__empty-icon" />
          <h3>No Items Yet</h3>
          <p>This shop doesn't have any items in its inventory.</p>
          <button
            className="shop-inventory__add-first-item"
            onClick={onAddItems}
          >
            <FaPlus /> Add First Item
          </button>
        </div>
      ) : (
        <div className="shop-inventory__grid">
          {/* Header Row */}
          <div className="shop-inventory__header-row">
            <div className="shop-inventory__col shop-inventory__col--item">Item</div>
            <div className="shop-inventory__col shop-inventory__col--description">Description</div>
            <div className="shop-inventory__col shop-inventory__col--price">Price (gp)</div>
            <div className="shop-inventory__col shop-inventory__col--quantity">Quantity</div>
            <div className="shop-inventory__col shop-inventory__col--status">Status</div>
            <div className="shop-inventory__col shop-inventory__col--actions">Actions</div>
          </div>

          {/* Inventory Items */}
          {shopItems.map((shopItem) => (
            <div key={shopItem.itemId} className="shop-inventory__row">
              <div className="shop-inventory__col shop-inventory__col--item">
                <button
                  className="shop-inventory__item-link"
                  onClick={() => navigate(`/items/${shopItem.itemId}`)}
                  title="View item details"
                >
                  <FaEye className="shop-inventory__item-view-icon" />
                  {shopItem.item?.name}
                </button>
              </div>
              
              <div className="shop-inventory__col shop-inventory__col--description">
                {shopItem.item?.description}
              </div>
              
              <div className="shop-inventory__col shop-inventory__col--price">
                {editingItem === shopItem.itemId ? (
                  <input
                    type="number"
                    value={editValues.price || 0}
                    onChange={(e) => handleEditValueChange('price', parseFloat(e.target.value) || 0)}
                    className="shop-inventory__edit-input shop-inventory__edit-input--price"
                    min="0"
                    step="0.01"
                  />
                ) : (
                  <span className="shop-inventory__price-display">
                    <FaCoins className="shop-inventory__price-icon" />
                    {shopItem.price}
                  </span>
                )}
              </div>
              
              <div className="shop-inventory__col shop-inventory__col--quantity">
                {editingItem === shopItem.itemId ? (
                  <input
                    type="number"
                    value={editValues.quantity || 0}
                    onChange={(e) => handleEditValueChange('quantity', parseInt(e.target.value) || 0)}
                    className="shop-inventory__edit-input shop-inventory__edit-input--quantity"
                    min="0"
                  />
                ) : (
                  <span>{shopItem.quantity}</span>
                )}
              </div>
              
              <div className="shop-inventory__col shop-inventory__col--status">
                {editingItem === shopItem.itemId ? (
                  <select
                    value={editValues.available ? 'true' : 'false'}
                    onChange={(e) => handleEditValueChange('available', e.target.value === 'true')}
                    className="shop-inventory__edit-select"
                  >
                    <option value="true">Available</option>
                    <option value="false">Out of Stock</option>
                  </select>
                ) : (
                  <span className={`shop-inventory__status-badge ${
                    shopItem.available 
                      ? "shop-inventory__status-badge--available" 
                      : "shop-inventory__status-badge--unavailable"
                  }`}>
                    {shopItem.available ? "Available" : "Out of Stock"}
                  </span>
                )}
              </div>
              
              <div className="shop-inventory__col shop-inventory__col--actions">
                {editingItem === shopItem.itemId ? (
                  <div className="shop-inventory__edit-actions">
                    <button
                      className="shop-inventory__save-btn"
                      onClick={() => handleSaveEdit(shopItem.itemId)}
                      title="Save changes"
                    >
                      <FaSave />
                    </button>
                    <button
                      className="shop-inventory__cancel-btn"
                      onClick={handleCancelEdit}
                      title="Cancel edit"
                    >
                      <FaUndo />
                    </button>
                  </div>
                ) : (
                  <div className="shop-inventory__view-actions">
                    <button
                      className="shop-inventory__edit-btn-small"
                      onClick={() => handleEditItem(shopItem.itemId, shopItem)}
                      title="Edit item"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="shop-inventory__delete-btn-small"
                      onClick={() => handleDeleteItem(shopItem.itemId)}
                      title="Remove from shop"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopInventory;
