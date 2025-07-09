import type { Location } from "@/types/campaigns";

export function useLocationActions(
  locations: Location[],
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>,
) {
  const createLocation = (locationData: Omit<Location, "id">): Location => {
    const newLocation: Location = {
      ...locationData,
      id: Math.random().toString(36).substring(2, 11),
    };
    setLocations((previousLocations) => [...previousLocations, newLocation]);
    return newLocation;
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations((previousLocations) =>
      previousLocations.map((location) =>
        location.id === id ? { ...location, ...updates } : location,
      ),
    );
  };

  const deleteLocation = (id: string) => {
    setLocations((previousLocations) =>
      previousLocations.filter((location) => location.id !== id),
    );
  };

  const getLocationById = (id: string) => {
    return locations.find((location) => location.id === id);
  };

  const getCampaignLocations = (campaignId: string) => {
    return locations.filter((location) => location.campaignId === campaignId);
  };

  return {
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getCampaignLocations,
  };
}
