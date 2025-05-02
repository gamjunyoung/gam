import { Outlet } from "react-router-dom";
import TopBar from "../organisms/TopBar";

const MainLayout = () => {
  return (
    <div className="container">
      <TopBar />
      <div className="main-content">{<Outlet />}</div>
      {/* <div className="sub-content"></div> */}
    </div>
  );
};

export default MainLayout;
