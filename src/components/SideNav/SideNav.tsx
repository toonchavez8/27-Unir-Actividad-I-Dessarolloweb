import Logo from "@/components/atomic/Logo";
import { siteRoutes } from "@/Routes/siteRoutes";
import "./_sideNav.css";
import { Link } from "react-router";
interface SideNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen = false, onClose }) => {
  // Filter routes that belong on sidebar
  const sidebarRoutes = siteRoutes.filter((route) => route.belongsOnSidebar);

  return (
    <nav className={`sidenav ${isOpen ? "sidenav--open" : ""} `}>
      <div className="sidenav__header ">
        <Link to={"/"}>
          <Logo />
        </Link>
        {onClose && (
          <button
            className="sidenav__close-btn "
            onClick={onClose}
            aria-label="Close navigation"
          >
            x
          </button>
        )}
      </div>

      <ul className="sidenav__list">
        {sidebarRoutes.map((route) => {
          const IconComponent = route.Icon;
          return (
            <li key={route.id} className="sidenav__item ">
              <Link to={route.path} className="sidenav__link">
                {IconComponent && <IconComponent />}
                <span className="sidenav__text">
                  {route.path.slice(1).charAt(0).toUpperCase() +
                    route.path.slice(2)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
