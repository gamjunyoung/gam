import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import TopBar from "../organisms/TopBar";

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const onSearch = () => {
    const regex = /^([a-zA-Z가-힣0-9\s]+)#([a-zA-Z가-힣0-9\s]{2,5})/i;
    const result = input.match(regex);
    if (!result) {
      alert("입력값 오류");
      return;
    }
    const gameName = result[1];
    const tagLine = result[2];

    navigate(
      `/summoner/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
    );
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // console.log(input);

  return (
    <>
      <div className="main-logo-container">
        <img className="main-logo" src="/logoimg.png"></img>
      </div>

      <div id="input_container">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          id="main_input"
          placeholder="소환사명#tag"
          onChange={onInputChange}
          value={input}
        ></input>
        <button id="search_btn" onClick={onSearch}>
          GA
        </button>
      </div>
    </>
  );
}

export default Home;
