import { useState, useEffect } from "react";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router";
import { TbMenu2 } from "react-icons/tb";
import "./Layout.css";

function Layout() {
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        // On mobile, sidebar should be closed by default
        setIsCollapsed(false);
      }
      if (!mobile && !isOpen && !isCollapsed) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isOpen, isCollapsed]);

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobile, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isMobile) {
      // On mobile, toggle between open/closed (no collapsed state)
      setIsOpen(!isOpen);
    } else {
      // On desktop, toggle between expanded/collapsed
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="layout">
      {/* Mobile Menu Button - only visible when sidebar is closed on mobile */}
      {isMobile && !isOpen && (
        <button
          className="layout__mobile-menu-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <TbMenu2 />
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <button
          className="layout__overlay layout__overlay--visible"
          onClick={handleOverlayClick}
          aria-label="Close sidebar"
        />
      )}

      <SideNav
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onClose={handleClose}
        onToggle={handleToggle}
        isMobile={isMobile}
      />

      <main
        className={`layout__main ${isCollapsed && !isMobile ? "layout__main--expanded" : ""}`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
