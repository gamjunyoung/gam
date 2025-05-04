import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Summoner from "./pages/Summoner";
import MainLayout from "./layouts/MainLayout";
import NullPage from "./pages/NullPage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/summoner/:gameName/:tagLine"
            element={<Summoner />}
          ></Route>
          <Route path="summoner/null" element={<NullPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
