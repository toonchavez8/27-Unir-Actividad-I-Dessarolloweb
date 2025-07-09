import { FaCalendar, FaUsers } from "react-icons/fa";
import { FaMapLocationDot, FaShop } from "react-icons/fa6";
import type { NavigateFunction } from "react-router";

export interface QuickActionsProps {
  readonly navigate: NavigateFunction;
}

export function QuickActions({ navigate }: QuickActionsProps) {
  return (
    <aside className="campaign-detail__sidebar">
      <nav className="campaign-detail__quick-links">
        <h3 className="campaign-detail__sidebar-title">Quick Actions</h3>
        <div className="campaign-detail__quick-link-grid">
          <button
            className="campaign-detail__quick-link"
            onClick={() => navigate("/sessions/new")}
          >
            <FaCalendar className="campaign-detail__quick-link-icon" />
            Plan Session
          </button>
          <button
            className="campaign-detail__quick-link"
            onClick={() => navigate("/npcs/new")}
          >
            <FaUsers className="campaign-detail__quick-link-icon" />
            Add NPC
          </button>
          <button
            className="campaign-detail__quick-link"
            onClick={() => navigate("/locations/new")}
          >
            <FaMapLocationDot className="campaign-detail__quick-link-icon" />
            Add Location
          </button>
          <button
            className="campaign-detail__quick-link"
            onClick={() => navigate("/shops/new")}
          >
            <FaShop className="campaign-detail__quick-link-icon" />
            Add Shop
          </button>
        </div>
      </nav>
    </aside>
  );
}
