export const mockSessions = [
  {
    id: "1",
    campaignId: "1",
    title: "The Mysterious Disappearance",
    description:
      "The party investigates the disappearance of several villagers from the border town of Millhaven.",
    date: new Date("2024-12-15"),
    duration: 240,
    summary:
      "The party discovered tracks leading to the old mine and found evidence of cultist activity.",
    events: [
      {
        id: "1",
        title: "Arrival at Millhaven",
        description: "Party enters the worried town and speaks with the mayor.",
        timestamp: "19:00",
        type: "roleplay",
      },
      {
        id: "2",
        title: "Investigation at the Mine",
        description:
          "Discovery of cultist symbols and strange magical residue.",
        timestamp: "20:30",
        type: "exploration",
      },
    ],
    notes:
      "Players showed great initiative in following the clues. Next session will explore the underground chambers.",
    status: "completed",
  },
  {
    id: "2",
    campaignId: "1",
    title: "Into the Depths",
    description:
      "The party ventures into the underground chambers beneath the old mine.",
    date: new Date("2024-12-22"),
    duration: 180,
    summary: "",
    events: [],
    notes:
      "Planned session to explore the cultist hideout and confront the leader.",
    status: "planned",
  },
  {
    id: "3",
    campaignId: "2",
    title: "The Village of Emberfall",
    description:
      "Character introductions and the first signs of dragon activity.",
    date: new Date("2024-12-30"),
    duration: 240,
    summary: "",
    events: [],
    notes:
      "Opening session to establish character backgrounds and introduce the main threat.",
    status: "planned",
  },
];
