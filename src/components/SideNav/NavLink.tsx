import type { NavLinkProps } from "@/types/sidenavProps";
import { useLocation, Link } from "react-router";
import "./_sideNav.css";

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
  ...props
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={className}
      title={`go to ${to.charAt(0).toUpperCase() + to.slice(1)}`}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
