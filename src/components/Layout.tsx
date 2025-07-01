import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router";
import "./_Layout.css"; // Importing the layout CSS

function Layout() {
  return (
    <>
      <SideNav isOpen={true} />
      <div className="debug" id="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
