import type { Item } from "@/types/campaigns";

export function useItemActions(
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
) {
  const createItem = (itemData: Omit<Item, "id">): Item => {
    const newItem: Item = {
      ...itemData,
      id: Math.random().toString(36).substring(2, 11),
    };
    setItems((previousItems) => [...previousItems, newItem]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  const getItemById = (id: string) => {
    return items.find((item) => item.id === id);
  };

  const getCampaignItems = (campaignId: string) => {
    return items.filter((item) => item.campaignId === campaignId);
  };

  return {
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    getCampaignItems,
  };
}
