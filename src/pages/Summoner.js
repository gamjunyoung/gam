import { useEffect, useState } from "react";
import "./Summoner.scss";
import { IoIosRefresh } from "react-icons/io";
import { TbCapture } from "react-icons/tb";
import axios from "axios";
import { useParams } from "react-router-dom";

const version = "15.9.1";

function Summoner() {
  const { gameName: rawGameName, tagLine: rawTagLine } = useParams();
  const [gameName, setGameName] = useState(null);
  const [tagLine, setTagLine] = useState(null);
  const [level, setLevel] = useState(null);
  const [profileIconId, setProfileIconId] = useState(0);

  const load = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4500/api/summoner/${encodeURIComponent(
          rawGameName
        )}/${encodeURIComponent(rawTagLine)}`
      );

      setLevel(result.data.summoner.summonerLevel);
      setProfileIconId(result.data.summoner.profileIconId);
      setGameName(result.data.account.gameName);
      setTagLine(result.data.account.tagLine);

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const onRefresh = () => {
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="skeleton">
      <div className="summoner-container">
        <div className="summoner-icon imgw">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
          ></img>
        </div>
        <div className="summoner-info">
          <div className="summoner-level">{level}레벨</div>
          <div className="summoner-name">
            {gameName}#{tagLine}
          </div>
        </div>

        <div className="main-rank-info">
          <div className="main-rank imgw">
            <img className="rank-icon" src="/images/null.png"></img>
          </div>
          <div className="main-lanes">
            <div className="lane1 imgw">
              <img src="/images/null.png"></img>
            </div>
            <div className="lane2 imgw">
              <img src="/images/null.png"></img>
            </div>
          </div>
        </div>

        <div className="util-container">
          <div className="capture-btn">
            <TbCapture />
          </div>
          <div className="refresh-btn" onClick={onRefresh}>
            <IoIosRefresh />
          </div>
        </div>
      </div>

      <div className="detail-container">
        <div className="playtime-container"></div>
      </div>
    </div>
  );
}

export default Summoner;
