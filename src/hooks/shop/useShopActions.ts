import type { Shop } from "@/types/campaigns";

export function useShopActions(
  shops: Shop[],
  setShops: React.Dispatch<React.SetStateAction<Shop[]>>,
) {
  const createShop = (shopData: Omit<Shop, "id">): Shop => {
    const newShop: Shop = {
      ...shopData,
      id: Math.random().toString(36).substring(2, 11),
    };
    setShops((previousShops) => [...previousShops, newShop]);
    return newShop;
  };

  const updateShop = (id: string, updates: Partial<Shop>) => {
    setShops((previousShops) =>
      previousShops.map((shop) =>
        shop.id === id ? { ...shop, ...updates } : shop,
      ),
    );
  };

  const deleteShop = (id: string) => {
    setShops((previousShops) => previousShops.filter((shop) => shop.id !== id));
  };

  const getShopById = (id: string) => {
    return shops.find((shop) => shop.id === id);
  };

  const getCampaignShops = (campaignId: string) => {
    return shops.filter((shop) => shop.campaignId === campaignId);
  };

  return {
    createShop,
    updateShop,
    deleteShop,
    getShopById,
    getCampaignShops,
  };
}
