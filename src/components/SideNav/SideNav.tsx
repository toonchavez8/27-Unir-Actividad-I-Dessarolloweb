import { useState } from "react";
import Logo from "@/components/atomic/Logo";
import { siteRoutes } from "@/Routes/siteRoutes";
import "./_sideNav.css";
import "./_searchModal.css";
import { Link } from "react-router";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbX,
  TbSearch,
} from "react-icons/tb";

interface SideNavProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  isMobile?: boolean;
  onSearchOpen?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  isOpen = false,
  isCollapsed = false,
  onToggle,
  onClose,
  isMobile = false,
  onSearchOpen,
}) => {
  // Filter routes that belong on sidebar
  const sidebarRoutes = siteRoutes.filter((route) => route.belongsOnSidebar);

  // Touch/swipe gesture handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance for triggering close
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    // Close sidebar on left swipe
    if (isLeftSwipe && isOpen && onClose) {
      onClose();
    }
  };

  return (
    <nav
      className={`sidenav ${isOpen ? "sidenav--open" : ""} ${
        isCollapsed ? "sidenav--collapsed" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className=" sidenav__BorderToggle"
        onClick={onToggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      />
      <div className="sidenav__header">
        <Link to={"/"}>
          <Logo size="medium" isCollapsed={isCollapsed} />
        </Link>
        {/* Mobile close button */}
        {isMobile && onClose && (
          <button
            className="sidenav__close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <TbX />
          </button>
        )}
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

      {/* Toggle button positioned above footer */}

      {onToggle && (
        <div className="sidenav__toggle-section">
          {isCollapsed && (
            <button
              className="sidenav__search-icon-btn"
              aria-label="Open search"
              onClick={onSearchOpen}
            >
              <TbSearch />
            </button>
          )}
          {!isCollapsed && (
            <input
              type="text"
              className="sidenav__footer-searchbar"
              placeholder="Search... (Ctrl+K)"
              onFocus={onSearchOpen}
              readOnly
            />
          )}
          <button
            className="sidenav__toggle-btn"
            onClick={onToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <TbLayoutSidebarLeftExpand />
            ) : (
              <TbLayoutSidebarLeftCollapse />
            )}
          </button>
        </div>
      )}
      <div className="sidenav__footer">
        {/* Search bar next to theme toggle when expanded */}
        <div className="sidenav__footer-row">
          <ThemeToggle isCollapsed={isCollapsed} />
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
