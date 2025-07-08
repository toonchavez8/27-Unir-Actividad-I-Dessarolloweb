import { useState, useEffect } from "react";
import type { Session, NPC, Location, Shop, Item } from "@/types/campaigns";
import { useCampaignStore } from "./campaign/useCampaignStore";
import { useCampaignActions } from "./campaign/useCampaignActions";
import { useSessionStore } from "./session/useSessionStore";
import { useSessionActions } from "./session/useSessionActions";
import { useNPCStore } from "./npc/useNPCStore";
import { useNPCActions } from "./npc/useNPCActions";
import { useLocationStore } from "./location/useLocationStore";
import { useLocationActions } from "./location/useLocationActions";
import { useShopStore } from "./shop/useShopStore";
import { useShopActions } from "./shop/useShopActions";
import { useItemStore } from "./item/useItemStore";
import { useItemActions } from "./item/useItemActions";
import { useCanvasStore } from "./canvas/useCanvasStore";
import { useCanvasActions } from "./canvas/useCanvasActions";
import { useSearchActions } from "./useSearchActions";

export function useCampaigns() {
  const [loading, setLoading] = useState(true);

  // Campaign store and actions
  const { campaigns, setCampaigns } = useCampaignStore(loading);
  const { createCampaign, updateCampaign, deleteCampaign, getCampaignById } =
    useCampaignActions(campaigns, setCampaigns);

  // Session store and actions
  const { sessions, setSessions } = useSessionStore(loading);
  const {
    createSession,
    updateSession,
    deleteSession,
    getSessionById,
    getCampaignSessions,
  } = useSessionActions(sessions, setSessions);

  // NPC store and actions
  const { npcs, setNpcs } = useNPCStore(loading);
  const { createNPC, updateNPC, deleteNPC, getNPCById, getCampaignNPCs } =
    useNPCActions(npcs, setNpcs);

  // Location store and actions
  const { locations, setLocations } = useLocationStore(loading);
  const {
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getCampaignLocations,
  } = useLocationActions(locations, setLocations);

  // Shop store and actions
  const { shops, setShops } = useShopStore(loading);
  const { createShop, updateShop, deleteShop, getShopById, getCampaignShops } =
    useShopActions(shops, setShops);

  // Item store and actions
  const { items, setItems } = useItemStore(loading);
  const { createItem, updateItem, deleteItem, getItemById, getCampaignItems } =
    useItemActions(items, setItems);

  // Canvas store and actions
  const { canvasData, setCanvasData } = useCanvasStore(loading);
  const { updateCanvasData, getCanvasData } = useCanvasActions(
    canvasData,
    setCanvasData,
  );

  // Search actions
  const { searchAll } = useSearchActions(
    campaigns,
    sessions,
    npcs,
    locations,
    shops,
    items,
  );

  // Enhanced delete campaign that removes related data
  const deleteCampaignWithRelatedData = (id: string) => {
    deleteCampaign(id);
    setSessions((previousSessions: Session[]) =>
      previousSessions.filter((session: Session) => session.campaignId !== id),
    );
    setNpcs((previousNpcs: NPC[]) =>
      previousNpcs.filter((npc: NPC) => npc.campaignId !== id),
    );
    setLocations((previousLocations: Location[]) =>
      previousLocations.filter((location: Location) => location.campaignId !== id),
    );
    setShops((previousShops: Shop[]) =>
      previousShops.filter((shop: Shop) => shop.campaignId !== id),
    );
    setItems((previousItems: Item[]) =>
      previousItems.filter((item: Item) => item.campaignId !== id),
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    // State
    campaigns,
    sessions,
    npcs,
    locations,
    shops,
    items,
    canvasData,
    loading,

    // Campaign actions
    createCampaign,
    updateCampaign,
    deleteCampaign: deleteCampaignWithRelatedData,
    getCampaignById,

    // Session actions
    createSession,
    updateSession,
    deleteSession,
    getSessionById,
    getCampaignSessions,

    // NPC actions
    createNPC,
    updateNPC,
    deleteNPC,
    getNPCById,
    getCampaignNPCs,

    // Location actions
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getCampaignLocations,

    // Shop actions
    createShop,
    updateShop,
    deleteShop,
    getShopById,
    getCampaignShops,

    // Item actions
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    getCampaignItems,

    // Canvas actions
    updateCanvasData,
    getCanvasData,

    // Search actions
    searchAll,
  };
}
