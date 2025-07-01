import Campaigns from "@/pages/Campaigns";
import Items from "@/pages/Items";
import LandingPage from "@/pages/LandingPage";
import Locations from "@/pages/Locations";
import NotFound from "@/pages/NotFound";
import Npcs from "@/pages/Npcs";
import Sessiones from "@/pages/Sessiones";
import Settings from "@/pages/Settings";
import Shops from "@/pages/Shops";
import type { ComponentType } from "react";
import { FaGear, FaMapLocationDot, FaShop } from "react-icons/fa6";
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
    path: "/sessions",
    Element: Sessiones,
    belongsOnSidebar: true,
    Icon: GiMagicPortal,
  },
  {
    id: 5,
    path: "/npcs",
    Element: Npcs,
    belongsOnSidebar: true,
    Icon: MdPeopleAlt,
  },
  {
    id: 6,
    path: "/shops",
    Element: Shops,
    belongsOnSidebar: true,
    Icon: FaShop,
  },
  {
    id: 7,
    path: "/locations",
    Element: Locations,
    belongsOnSidebar: true,
    Icon: FaMapLocationDot,
  },
  {
    id: 8,
    path: "/settings",
    Element: Settings,
    belongsOnSidebar: true,
    Icon: FaGear,
  },
  {
    id: 9,
    path: "/items",
    Element: Items,
    belongsOnSidebar: true,
    Icon: GiSwordSmithing,
  },
];
