import type {
  Campaign,
  Session,
  NPC,
  Location,
  Shop,
  Item,
} from "@/types/campaigns";

export function useSearchActions(
  campaigns: Campaign[],
  sessions: Session[],
  npcs: NPC[],
  locations: Location[],
  shops: Shop[],
  items: Item[],
) {
  const searchAll = (query: string) => {
    const lowerQuery = query.toLowerCase();

    return {
      campaigns: campaigns.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(lowerQuery) ||
          campaign.description.toLowerCase().includes(lowerQuery) ||
          campaign.worldName.toLowerCase().includes(lowerQuery),
      ),
      sessions: sessions.filter(
        (session) =>
          session.title.toLowerCase().includes(lowerQuery) ||
          session.description.toLowerCase().includes(lowerQuery),
      ),
      npcs: npcs.filter(
        (npc) =>
          npc.name.toLowerCase().includes(lowerQuery) ||
          npc.description.toLowerCase().includes(lowerQuery),
      ),
      locations: locations.filter(
        (location) =>
          location.name.toLowerCase().includes(lowerQuery) ||
          location.description.toLowerCase().includes(lowerQuery),
      ),
      shops: shops.filter(
        (shop) =>
          shop.name.toLowerCase().includes(lowerQuery) ||
          shop.description.toLowerCase().includes(lowerQuery),
      ),
      items: items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery),
      ),
    };
  };

  return { searchAll };
}
