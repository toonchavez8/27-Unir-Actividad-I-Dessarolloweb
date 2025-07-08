import type { Campaign } from "@/types/campaigns";

export function useCampaignActions(
  campaigns: Campaign[],
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>,
) {
  const createCampaign = (
    data: Omit<
      Campaign,
      "id" | "createdAt" | "updatedAt" | "sessions" | "npcs" | "locations"
    >,
  ): Campaign => {
    const newCampaign: Campaign = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      updatedAt: new Date(),
      sessions: [],
      npcs: [],
      locations: [],
    };
    setCampaigns((previousCampaigns) => [...previousCampaigns, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns((previousCampaigns) =>
      previousCampaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, ...updates, updatedAt: new Date() }
          : campaign,
      ),
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((previousCampaigns) =>
      previousCampaigns.filter((campaign) => campaign.id !== id),
    );
  };

  const getCampaignById = (id: string) => {
    return campaigns.find((campaign) => campaign.id === id);
  };

  return { createCampaign, updateCampaign, deleteCampaign, getCampaignById };
}
