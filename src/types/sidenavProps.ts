import type { RefObject } from "react";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export interface ThemeToggleProps {
  isCollapsed?: boolean;
}

export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  "data-tooltip"?: string;
  tittle?: string;
  isCollapsed?: boolean;
}

export interface SideNavProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  isMobile?: boolean;
  onSearchOpen?: () => void;
}
