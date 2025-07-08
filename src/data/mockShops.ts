export const mockShops = [
  {
    id: "1",
    campaignId: "1",
    name: "Ironforge Armaments",
    description:
      "The finest weapons and armor in all of Millhaven, crafted by master dwarf Gareth Ironforge.",
    type: "weapons",
    locationId: "2",
    ownerId: "4",
    items: [
      { itemId: "1", quantity: 5, price: 15, available: true },
      { itemId: "2", quantity: 3, price: 1500, available: true },
      { itemId: "3", quantity: 10, price: 50, available: true },
    ],
    imageUrl:
      "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
    notes: "Gareth offers a 10% discount to heroes who help the town.",
  },
  {
    id: "2",
    campaignId: "1",
    name: "Moonbeam Apothecary",
    description:
      "A mystical shop selling potions, herbs, and magical components.",
    type: "alchemy",
    locationId: "2",
    ownerId: "1",
    items: [
      { itemId: "4", quantity: 20, price: 50, available: true },
      { itemId: "5", quantity: 5, price: 300, available: true },
    ],
    imageUrl:
      "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg",
    notes: "Eldara occasionally visits to restock rare magical components.",
  },
];
