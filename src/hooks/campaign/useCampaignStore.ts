import { useState, useEffect } from "react";
import type { Campaign } from "@/types/campaigns";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/utils/storage";
import { mockCampaigns } from "@/data/mockCampaigns";

export function useCampaignStore(loading: boolean) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const loadedCampaigns = loadFromStorage(
      STORAGE_KEYS.campaigns,
      mockCampaigns,
    );
    const allowedStatuses = [
      "active",
      "planning",
      "completed",
      "paused",
    ] as const;
    const processedCampaigns = loadedCampaigns.map((campaign) => ({
      ...campaign,
      createdAt: new Date(campaign.createdAt),
      updatedAt: new Date(campaign.updatedAt),
      status: allowedStatuses.includes(
        campaign.status as (typeof allowedStatuses)[number],
      )
        ? (campaign.status as (typeof allowedStatuses)[number])
        : "active",
    }));
    setCampaigns(processedCampaigns as Campaign[]);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveToStorage(STORAGE_KEYS.campaigns, campaigns);
    }
  }, [campaigns, loading]);

  return { campaigns, setCampaigns };
}
