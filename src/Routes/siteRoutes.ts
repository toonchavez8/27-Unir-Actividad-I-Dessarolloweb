import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";
import type { ComponentType } from "react";

interface SiteRoute {
  readonly id: number;
  readonly path: string;
  readonly Element: ComponentType<Record<string, never>>; // More specific than 'any'
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
];
