import React from "react";
import "./_Logo.css";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "horizontal" | "vertical";
  className?: string;
  isCollapsed?: boolean; // Optional prop for collapsed state
}

const Logo: React.FC<LogoProps> = ({
  size = "medium",
  variant = "horizontal",
  className = "anim",
  isCollapsed = false,
}) => {
  // When collapsed, always use small size and only show icon
  const logoSize = isCollapsed ? "small" : size;
  const logoClasses =
    `logo ${className} logo--${logoSize} logo--${variant}`.trim();

  return (
    <figure className={logoClasses}>
      <img src="/dice_Logo.svg" alt="DM Journal Logo" className="logo__image" />
      {!isCollapsed && (
        <figcaption className="logo__text">DM Journal</figcaption>
      )}
    </figure>
  );
};

export default Logo;
