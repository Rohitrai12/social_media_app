import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombanner from "@/components/shared/Bottombanner";
// import Bottombar from "@/components/shared/Bottombar";
// import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Topbar />
      {/* <LeftSidebar /> */}

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombanner />
    </div>
  );
};

export default RootLayout;
