import "./_sideNav.css";
interface SideNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen = false, onClose }) => {
  return (
    <nav className={`sidenav ${isOpen ? "sidenav--open" : ""} `}>
      <div className="sidenav__header">
        <h2 className="sidenav__title">Menu</h2>
        {onClose && (
          <button
            className="sidenav__close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            ×
          </button>
        )}
      </div>

      <ul className="sidenav__list">
        <li className="sidenav__item">
          <a href="/" className="sidenav__link">
            Dashboard
          </a>
        </li>
        <li className="sidenav__item">
          <a href="/" className="sidenav__link">
            Campaigns
          </a>
        </li>
        <li className="sidenav__item">
          <a href="/" className="sidenav__link">
            Sessions
          </a>
        </li>
        <li className="sidenav__item">
          <a href="/" className="sidenav__link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
