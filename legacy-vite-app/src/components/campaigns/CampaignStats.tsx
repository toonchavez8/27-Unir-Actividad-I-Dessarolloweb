import { FaCalendar, FaUsers } from "react-icons/fa";
import { FaMapLocationDot, FaShop } from "react-icons/fa6";
import { GiSwordSmithing } from "react-icons/gi";

export interface CampaignStatsProps {
  readonly sessionsCount: number;
  readonly npcsCount: number;
  readonly locationsCount: number;
  readonly shopsCount: number;
  readonly itemsCount: number;
}

export function CampaignStats({
  sessionsCount,
  npcsCount,
  locationsCount,
  shopsCount,
  itemsCount,
}: CampaignStatsProps) {
  return (
    <section className="campaign-detail__stats">
      <div className="campaign-detail__stat-card">
        <FaCalendar className="campaign-detail__stat-icon" />
        <div className="campaign-detail__stat-content">
          <span className="campaign-detail__stat-number">{sessionsCount}</span>
          <span className="campaign-detail__stat-label">Sessions</span>
        </div>
      </div>

      <div className="campaign-detail__stat-card">
        <FaUsers className="campaign-detail__stat-icon" />
        <div className="campaign-detail__stat-content">
          <span className="campaign-detail__stat-number">{npcsCount}</span>
          <span className="campaign-detail__stat-label">NPCs</span>
        </div>
      </div>

      <div className="campaign-detail__stat-card">
        <FaMapLocationDot className="campaign-detail__stat-icon" />
        <div className="campaign-detail__stat-content">
          <span className="campaign-detail__stat-number">{locationsCount}</span>
          <span className="campaign-detail__stat-label">Locations</span>
        </div>
      </div>

      <div className="campaign-detail__stat-card">
        <FaShop className="campaign-detail__stat-icon" />
        <div className="campaign-detail__stat-content">
          <span className="campaign-detail__stat-number">{shopsCount}</span>
          <span className="campaign-detail__stat-label">Shops</span>
        </div>
      </div>

      <div className="campaign-detail__stat-card">
        <GiSwordSmithing className="campaign-detail__stat-icon" />
        <div className="campaign-detail__stat-content">
          <span className="campaign-detail__stat-number">{itemsCount}</span>
          <span className="campaign-detail__stat-label">Items</span>
        </div>
      </div>
    </section>
  );
}
