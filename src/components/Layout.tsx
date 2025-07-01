import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <SideNav isOpen={true} />
      <div className="" id="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
