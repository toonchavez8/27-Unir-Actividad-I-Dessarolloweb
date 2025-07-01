import React from "react";
import "./_Logo.css";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "horizontal" | "vertical";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "large",
  variant = "horizontal",
  className = "anim",
}) => {
  const logoClasses = `logo ${className} logo--${size} logo--${variant}`.trim();

  return (
    <figure className={logoClasses}>
      <img src="/dice_Logo.svg" alt="DM Journal Logo" className="logo__image" />
      <figcaption className="logo__text">DM Journal</figcaption>
    </figure>
  );
};

export default Logo;
