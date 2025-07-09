export const mockItems = [
  {
    id: '1',
    campaignId: '1',
    name: 'Longsword',
    type: 'weapon',
    rarity: 'common',
    description: 'A well-crafted steel longsword with a leather-wrapped hilt.',
    properties: ['Versatile (1d10)', 'Finesse'],
    value: 15,
    weight: 3,
    imageUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    notes: 'Standard adventuring weapon.'
  },
  {
    id: '2',
    campaignId: '1',
    name: 'Flametongue Sword',
    type: 'weapon',
    rarity: 'rare',
    description: 'A magical sword that bursts into flames when activated.',
    properties: ['Versatile (1d10)', '+2d6 fire damage', 'Light source'],
    value: 1500,
    weight: 3,
    imageUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    notes: 'Requires attunement. Command word: "Ignis".'
  },
  {
    id: '3',
    campaignId: '1',
    name: 'Chain Mail',
    type: 'armor',
    rarity: 'common',
    description: 'Interlocking metal rings provide solid protection.',
    properties: ['AC 16', 'Disadvantage on Stealth'],
    value: 75,
    weight: 55,
    notes: 'Heavy armor, requires strength 13.'
  },
  {
    id: '4',
    campaignId: '1',
    name: 'Healing Potion',
    type: 'consumable',
    rarity: 'common',
    description: 'A red liquid that glows faintly when agitated.',
    properties: ['Heals 2d4+2 HP', 'Action to consume'],
    value: 50,
    weight: 0.5,
    notes: 'Most common magical healing item.'
  },
  {
    id: '5',
    campaignId: '1',
    name: 'Potion of Fire Resistance',
    type: 'consumable',
    rarity: 'uncommon',
    description: 'An orange potion that feels warm to the touch.',
    properties: ['Fire resistance for 1 hour', 'Action to consume'],
    value: 300,
    weight: 0.5,
    notes: 'Particularly useful against dragons.'
  }
];