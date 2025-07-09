import { useNavigate } from "react-router";
import { FaPlus, FaBolt } from "react-icons/fa";
import { Card } from "@/components/atomic/Card";
import "./QuickActions.css";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: "new-session",
      icon: FaPlus,
      label: "Plan New Session",
      path: "/sessions/new",
    },
    {
      id: "new-npc",
      icon: FaPlus,
      label: "Create NPC",
      path: "/npcs/new",
    },
    {
      id: "new-location",
      icon: FaPlus,
      label: "Add Location",
      path: "/locations/new",
    },
  ];

  return (
    <Card className="quick-actions">
      <div className="quick-actions__header">
        <h3 className="quick-actions__title">
          <FaBolt className="quick-actions__title-icon" />
          Quick Actions
        </h3>
      </div>
      
      <div className="quick-actions__content">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              className="quick-actions__button"
              onClick={() => navigate(action.path)}
            >
              <IconComponent className="quick-actions__button-icon" />
              {action.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
