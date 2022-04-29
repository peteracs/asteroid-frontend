import React from "react";
import Rodal from "rodal";
import PopupContent from "./popup.jsx";
import Loader from "../layout/loader.jsx";
import { useRecoilValue } from "recoil";
import { minersState } from "../../state/miners";
import { minerStatusesState } from "../../state/miners";

function MinerList() {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const miners = useRecoilValue(minersState);
  const [selectedMiner, setSelectedMiner] = React.useState(false);

  const [popupHistories, setPopupHistories] = React.useState([]);

  const minerStatuses = useRecoilValue(minerStatusesState);

  const showPopup = (miner) => {
    setSelectedMiner(miner);
    setPopupVisible(true);
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + `/history?minerId=${miner._id}`)
      .then((response) => response.json())
      .then((json) => {
        setPopupHistories(json);
        setLoading(false);
      });
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Planet</th>
            <th>Carry capacity</th>
            <th>Minerals</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {miners.map((miner) => (
            <tr key={miner._id} onClick={showPopup.bind(this, miner)}>
              <td>{miner.name}</td>
              <td>{miner.planet.name}</td>
              <td>{miner.carryCapacity}</td>
              <td>{miner.minerals}</td>
              <td>{miner.miningSpeed}</td>
              <td>
                {Math.round(miner.x)}, {Math.round(miner.y)}
              </td>
              <td>
                <span>{minerStatuses[miner.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Rodal visible={popupVisible} onClose={hidePopup} height={480}>
        <h2>History of {selectedMiner.name} </h2>
        <button onClick={showPopup.bind(this, selectedMiner)}>Refresh</button>

        {loading ? <Loader /> : <PopupContent histories={popupHistories} />}
      </Rodal>
    </div>
  );
}

export default MinerList;
