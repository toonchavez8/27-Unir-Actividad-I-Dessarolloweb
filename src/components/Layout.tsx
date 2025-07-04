import { useState } from "react";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router";
import "./Layout.css";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <SideNav
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onClose={handleClose}
        onToggle={handleToggle}
      />
      <main
        className={` layout__main  ${isCollapsed ? "layout__main--expanded" : ""}`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
