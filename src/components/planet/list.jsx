/**
 * List of planets
 */

import React from "react";
import Rodal from "rodal";
import PopupContent from "./popup.jsx";
import CreateMinerForm from "./createMiner.jsx";
import Loader from "../layout/loader.jsx";
import { useRecoilValue } from "recoil";
import { planetsState } from "../../state/planets";

function PlanetList() {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [formVisible, setFormVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedPlanet, setSelectedPlanet] = React.useState(false);
  const [popupMiners, setPopupMiners] = React.useState([]);
  const planets = useRecoilValue(planetsState);

  const showPopup = (planet) => {
    setSelectedPlanet(planet);
    setPopupVisible(true);
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + `/miners?planetId=${planet._id}`)
      .then((response) => response.json())
      .then((json) => {
        setPopupMiners(json);
        setLoading(false);
      });
  };

  // Hide planet popup
  const hidePopup = () => {
    setPopupVisible(false);
  };

  // Show create miner form popup
  const showForm = (planet, e) => {
    setSelectedPlanet(planet);
    e.stopPropagation();
    setFormVisible(true);
  };

  // Hide create miner form popup
  const hideForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Miners</th>
            <th>Minerals</th>
            <th>Position (x, y)</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {planets.map((planet) => (
            <tr key={planet._id} onClick={showPopup.bind(this, planet)}>
              <td>{planet.name}</td>
              <td>{planet.miners}</td>
              <td>{planet.minerals}</td>
              <td>
                {Math.round(planet.position.x)}, {Math.round(planet.position.y)}
              </td>
              <td>
                <div
                  className="icon-addminer"
                  onClick={showForm.bind(this, planet)}
                >
                  Create a miner
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Rodal visible={popupVisible} onClose={hidePopup} height={480}>
        <h2>List of miners of {selectedPlanet.name}</h2>
        <button onClick={showPopup.bind(this, selectedPlanet)}>Refresh</button>

        {loading ? <Loader /> : <PopupContent miners={popupMiners} />}
      </Rodal>

      <Rodal visible={formVisible} onClose={hideForm} height={480}>
        <h2>Create a miner</h2>
        <CreateMinerForm hideForm={hideForm} selectedPlanet={selectedPlanet} />
      </Rodal>
    </div>
  );
}

export default PlanetList;
