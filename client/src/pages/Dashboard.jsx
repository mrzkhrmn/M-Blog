import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../components/DashSidebar";
import { DashProfile } from "../components/DashProfile";

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    // get the current url
    const urlParams = new URLSearchParams(location.search);
    // get the spesific param (tab in this case)
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex">
      <div className=" md:w-56">
        <DashSidebar tab={tab} />
      </div>
      {tab === "profile" ? <DashProfile /> : <h1>Another page</h1>}
    </div>
  );
};
