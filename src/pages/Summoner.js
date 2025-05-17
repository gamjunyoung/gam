import { useEffect, useMemo, useState } from "react";
import "./Summoner.scss";
import { IoIosRefresh } from "react-icons/io";
import { TbCapture } from "react-icons/tb";
import axios from "axios";
import { useFormAction, useParams, useResolvedPath } from "react-router-dom";
import { QueueType } from "../types/general";
import toast from "react-hot-toast";
import GamImage from "../atoms/GamImage";

function Summoner() {
  const { gameName: rawGameName, tagLine: rawTagLine } = useParams();
  const [gameName, setGameName] = useState(null);
  const [tagLine, setTagLine] = useState(null);
  const [level, setLevel] = useState(null);
  const [soloTierRank, setSoloTierRank] = useState(null);
  const [flexTierRank, setFlexTierRank] = useState(null);
  const [profileIconId, setProfileIconId] = useState(0);
  const [version, setVersion] = useState(null);
  const [mostChampName, setMostChampName] = useState(null);

  const representativeTierRank = useMemo(() => {
    return soloTierRank ?? flexTierRank ?? null;
  }, [soloTierRank, flexTierRank]);

  const repRankImageUrl = useMemo(() => {
    if (representativeTierRank == null) return "/images/null.png";
    return `https://opgg-static.akamaized.net/images/medals_new/${representativeTierRank.tier?.toLowerCase()}.png`;
  }, [representativeTierRank]);

  const repRankTier = useMemo(() => {
    if (representativeTierRank == null) return "Unrank";
    return `${representativeTierRank.tier} ${representativeTierRank.rank}`;
  });
  const load = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4500/api/summoner/${encodeURIComponent(
          rawGameName
        )}/${encodeURIComponent(rawTagLine)}`
      );
      console.log(result.data);
      setLevel(result.data.summoner.summonerLevel);
      setProfileIconId(result.data.summoner.profileIconId);
      setGameName(result.data.account.gameName);
      setTagLine(result.data.account.tagLine);
      setVersion(result.data.version);
      setMostChampName(result.data.summonerMostChampion);

      const solo = result.data.summonerRank?.[QueueType.SOLO_RANK] ?? null;
      setSoloTierRank(solo ? { tier: solo?.tier, rank: solo?.rank } : null);

      const flex = result.data.summonerRank?.[QueueType.FLEX_RANK] ?? null;
      setFlexTierRank(flex ? { tier: flex?.tier, rank: flex?.rank } : null);

      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(flexTierRank, representativeTierRank);
  const onRefresh = () => {
    toast.promise(load(), {
      loading: "플레이어 정보를 불러오는 중...",
      success: <b>로드 성공!</b>,
      error: <b>로드 실패 ㅠㅠ</b>,
    });
  };

  useEffect(() => {
    load();
  }, []);

  console.log(mostChampName);

  return (
    <div className="skeleton">
      <div className="summoner-container">
        <GamImage
          className={"most-champ-img"}
          verifier={mostChampName}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mostChampName}_0.jpg`}
        />
        <GamImage
          className={"summoner-icon"}
          verifier={profileIconId}
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
        />
        <div className="summoner-info">
          <div className="summoner-level">{level}레벨</div>
          <div className="summoner-name">
            {gameName}#{tagLine}
          </div>
        </div>

        <div className="main-rank-info">
          <GamImage
            className="main-rank"
            src={repRankImageUrl}
            verifier={repRankImageUrl}
          >
            <div className="tierRank">{repRankTier}</div>
          </GamImage>
          <div className="main-lanes">
            <GamImage
              className="lane1"
              src="/images/null.png"
              verifier={null}
            />
            <GamImage
              className="lane2"
              src="/images/null.png"
              verifier={null}
            />
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
