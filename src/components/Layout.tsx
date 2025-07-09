import { useState, useEffect, useRef } from "react";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router";
import { TbMenu2 } from "react-icons/tb";
import "./Layout.css";
import SearchModal from "./SideNav/SearchModal";

function Layout() {
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);

  //Revisamos si estamos en mobile y ajustamos el estado del sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // si estamos en mobile, el sidebar debe estar cerrado por defecto
      if (mobile) {
        setIsCollapsed(false);
      }
      // si no estamos en mobile y el sidebar no está abierto ni colapsado, lo abrimos
      if (!mobile && !isOpen && !isCollapsed) {
        setIsOpen(true);
      }
    };

    // revisamos el tamaño de la ventana al cargar y al redimensionar la ventana
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isOpen, isCollapsed]);

  // Cerramos el sidebar al presionar Escape en mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && isOpen) {
        setIsOpen(false);
      }
    };

    // Escucha el evento de teclado para cerrar el sidebar en mobile
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobile, isOpen]);

  // Agregamos un manejador de teclas para Ctrl+K para abrir/cerrar el modal de búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Foco en el input de búsqueda cuando se abre el modal
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Cerrar el modal de búsqueda con Escape
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  // Mouse tracking for decorative highlight circle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isMobile) {
      // En mobile si el sidebar está abierto, lo cerramos
      setIsOpen(!isOpen);
    } else {
      // en desktop, alternamos entre expandido/colapsado
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
      {/* Decorative mouse-following highlight circle */}
      <div 
        className="layout__highlight-circle"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      
      {/* Search Modal overlays everything */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        inputRef={searchInputRef}
      />
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
        onSearchOpen={() => setIsSearchOpen(true)}
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
