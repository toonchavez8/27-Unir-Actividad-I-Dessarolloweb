import Campaigns from "@/pages/Campaigns";
import CampaignDetail from "@/pages/CampaignDetail";
import EditCampaign from "@/pages/EditCampaign";
import EditSession from "@/pages/EditSession";
import EditItem from "@/pages/EditItem";
import Items from "@/pages/Items";
import ItemDetail from "@/pages/ItemDetail";
import LandingPage from "@/pages/LandingPage";
import Locations from "@/pages/Locations";
import LocationDetail from "@/pages/LocationDetail";
import NewCampaign from "@/pages/NewCampaign";
import NewItem from "@/pages/NewItem";
import NewLocation from "@/pages/NewLocation";
import NewNPC from "@/pages/NewNPC";
import NewSession from "@/pages/NewSession";
import NewShop from "@/pages/NewShop";
import NPCDetail from "@/pages/NPCDetail";
import NotFound from "@/pages/NotFound";
import Npcs from "@/pages/Npcs";
import Sessiones from "@/pages/Sessiones";
import SessionDetail from "@/pages/SessionDetail";
import Shops from "@/pages/Shops";
import ShopDetail from "@/pages/ShopDetail";
import { SessionRunner } from "@/components/session";
import type { ComponentType } from "react";
import { FaMapLocationDot, FaShop } from "react-icons/fa6";
import { GiMagicPortal, GiSwordSmithing } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";
import { SiCampaignmonitor } from "react-icons/si";

interface SiteRoute {
  readonly id: number;
  readonly path: string;
  readonly Element: ComponentType<Record<string, never>>;
  readonly belongsOnSidebar?: boolean;
  readonly Icon?: ComponentType<Record<string, never>>; // Optional icon for sidebar
}

export const siteRoutes: SiteRoute[] = [
  {
    id: 1,
    path: "/",
    Element: LandingPage,
  },
  {
    id: 2,
    path: "*",
    Element: NotFound,
  },
  {
    id: 3,
    path: "/campaigns",
    Element: Campaigns,
    belongsOnSidebar: true,
    Icon: SiCampaignmonitor,
  },
  {
    id: 4,
    path: "/campaigns/:campaignId",
    Element: CampaignDetail,
  },
  {
    id: 5,
    path: "/campaigns/create/new",
    Element: NewCampaign,
  },
  {
    id: 6,
    path: "/campaigns/:campaignId/edit",
    Element: EditCampaign,
  },
  {
    id: 7,
    path: "/sessions",
    Element: Sessiones,
    belongsOnSidebar: true,
    Icon: GiMagicPortal,
  },
  {
    id: 8,
    path: "/sessions/create/new",
    Element: NewSession,
  },
  {
    id: 9,
    path: "/campaigns/:campaignId/sessions/create/new",
    Element: NewSession,
  },
  {
    id: 10,
    path: "/campaigns/:campaignId/sessions/:sessionId/edit",
    Element: EditSession,
  },
  {
    id: 11,
    path: "/npcs",
    Element: Npcs,
    belongsOnSidebar: true,
    Icon: MdPeopleAlt,
  },
  {
    id: 12,
    path: "/npcs/create/new",
    Element: NewNPC,
  },
  {
    id: 13,
    path: "/campaigns/:campaignId/npcs/create/new",
    Element: NewNPC,
  },
  {
    id: 14,
    path: "/campaigns/:campaignId/npcs/:npcId",
    Element: NPCDetail,
  },
  {
    id: 15,
    path: "/shops",
    Element: Shops,
    belongsOnSidebar: true,
    Icon: FaShop,
  },
  {
    id: 22,
    path: "/shops/:shopId",
    Element: ShopDetail,
  },
  {
    id: 23,
    path: "/shops/create/new",
    Element: NewShop,
  },
  {
    id: 24,
    path: "/campaigns/:campaignId/shops/create/new",
    Element: NewShop,
  },
  {
    id: 16,
    path: "/locations",
    Element: Locations,
    belongsOnSidebar: true,
    Icon: FaMapLocationDot,
  },
  {
    id: 25,
    path: "/locations/create/new",
    Element: NewLocation,
  },
  {
    id: 26,
    path: "/locations/:locationId",
    Element: LocationDetail,
  },
  {
    id: 28,
    path: "/campaigns/:campaignId/locations/:locationId",
    Element: LocationDetail,
  },
  {
    id: 17,
    path: "/items",
    Element: Items,
    belongsOnSidebar: true,
    Icon: GiSwordSmithing,
  },
  {
    id: 27,
    path: "/items/create/new",
    Element: NewItem,
  },
  {
    id: 29,
    path: "/campaigns/:campaignId/items/create",
    Element: NewItem,
  },
  {
    id: 18,
    path: "/items/:itemId",
    Element: ItemDetail,
  },
  {
    id: 28,
    path: "/items/:itemId/edit",
    Element: EditItem,
  },
  {
    id: 19,
    path: "/campaigns/:campaignId/sessions/:sessionId",
    Element: SessionDetail,
  },
  {
    id: 20,
    path: "/sessions/:sessionId/run",
    Element: SessionRunner,
  },
  {
    id: 21,
    path: "/campaigns/:campaignId/sessions/:sessionId/run",
    Element: SessionRunner,
  },
];
