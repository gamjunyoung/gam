import { Navigate, useNavigate } from "react-router-dom";
import "./TopBar.scss";

const TopBar = () => {
  const navigate = useNavigate();
  const gohome = () => {
    navigate("/");
  };

  return (
    <div id="top_bar">
      <img src="/gam.png" onClick={gohome}></img>
    </div>
  );
};

export default TopBar;
