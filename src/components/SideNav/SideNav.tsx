import Logo from "@/components/atomic/Logo";
import { siteRoutes } from "@/Routes/siteRoutes";
import "./_sideNav.css";
import { Link } from "react-router";
import NavLink from "./NavLink";
interface SideNavProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  isOpen = false,
  isCollapsed = false,
  onToggle,
}) => {
  // Filter routes that belong on sidebar
  const sidebarRoutes = siteRoutes.filter((route) => route.belongsOnSidebar);

  return (
    <nav
      className={`sidenav ${isOpen ? "sidenav--open" : ""} ${isCollapsed ? "sidenav--collapsed" : ""}`}
    >
      <div className="sidenav__header ">
        <div className="sidenav__logo">
          <Link to={"/"}>
            <Logo size="medium" isCollapsed={isCollapsed} />
          </Link>
        </div>
        <div className="sidenav__controls">
          {onToggle && (
            <button
              className="sidenav__toggle-btn"
              onClick={onToggle}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isCollapsed ? (
                  <path d="M9 18l6-6-6-6" />
                ) : (
                  <path d="M15 18l-6-6 6-6" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="sidenav__content">
        <ul className="sidenav__list">
          {sidebarRoutes.map((route) => {
            const IconComponent = route.Icon;
            const routeName =
              route.path.slice(1).charAt(0).toUpperCase() + route.path.slice(2);
            return (
              <li key={route.id} className="sidenav__item">
                <NavLink
                  to={route.path}
                  className="sidenav__link"
                  data-tooltip={routeName}
                >
                  <div className="sidenav__icon-wrapper">
                    {IconComponent && <IconComponent />}
                  </div>
                  <span className="sidenav__text">{routeName}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
