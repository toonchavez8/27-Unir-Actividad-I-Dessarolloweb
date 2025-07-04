import { useLocation, Link } from "react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  "data-tooltip"?: string;
}

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
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
