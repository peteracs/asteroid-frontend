/**
 * Create miner popup
 */

import React from "react";
import { useRecoilValue } from "recoil";
import { planetsState } from "../../state/planets";
import Loader from "../layout/loader";

function CreateMiner({ selectedPlanet, hideForm }) {
  const [name, setName] = React.useState("");
  const [planet, setPlanet] = React.useState("");
  const [carryCapacity, setCarryCapacity] = React.useState(0);
  const [travelSpeed, setTravelSpeed] = React.useState(0);
  const [miningSpeed, setMiningSpeed] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const limit = 120;

  const planets = useRecoilValue(planetsState);

  const totalPoints = React.useMemo(() => {
    return (
      parseInt(carryCapacity) + parseInt(travelSpeed) + parseInt(miningSpeed)
    );
  }, [carryCapacity, travelSpeed, miningSpeed]);

  const handleSubmit = async (e) => {
    console.log(selectedPlanet);
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await fetch(process.env.REACT_APP_API_URL + `/miners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planet: selectedPlanet,
            minerals: 0,
            status: 0,
            angle: 0,
            x: selectedPlanet.position.x,
            y: selectedPlanet.position.y,
            travelSpeed,
            miningSpeed,
            carryCapacity,
            name,
          }),
        });
        const data = await res.json();
        if (data.errors) {
          setErrors((errors) => ({
            response: data.message,
            ...errors,
          }));
        } else {
          hideForm();
        }
      } catch (err) {
        setErrors((errors) => ({
          response: err,
          ...errors,
        }));
      }
      setLoading(false);
    }
  };

  const validateForm = () => {
    setErrors([]);
    let hasError = false;
    if (name.length < 3) {
      setErrors((errors) => ({
        name: "Name must be at least 3 characters long",
        ...errors,
      }));
      hasError = true;
    }
    if (!planet) {
      setErrors((errors) => ({
        planet: "You didn't select a planet!",
        ...errors,
      }));
      hasError = true;
    }

    if (totalPoints > limit) {
      setErrors((errors) => ({
        totalPoints: "You You have exceeded the total points!",
        ...errors,
      }));
      hasError = true;
    }

    return !hasError;
  };

  const resetForm = () => {
    setName("");
    setPlanet("");
    setCarryCapacity(0);
    setTravelSpeed(0);
    setMiningSpeed(0);
    setErrors([]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={`field ${errors.name ? "error" : ""}`}>
            {errors.response && <div className="red">{errors.response}</div>}

            <label htmlFor="name">Miner name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Miner name"
            />
            {errors.name && <div className="message">{errors.name}</div>}
          </div>

          <div className={`field ${errors.planet ? "error" : ""}`}>
            <label htmlFor="planet">Planet</label>
            <select
              value={planet}
              placeholder="Select a planet"
              id="planet"
              onChange={(e) => setPlanet(e.target.value)}
            >
              <option value="">Select planet</option>
              {planets.map((planet) => (
                <option value={planet._id} key={planet._id}>
                  {planet.name}
                </option>
              ))}
            </select>
            {errors.planet && <div className="message">{errors.planet}</div>}
          </div>

          <h2>Assign points</h2>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label htmlFor="carry-capacity">Carry capacity</label>
                <input
                  value={carryCapacity}
                  type="number"
                  id="carry-capacity"
                  placeholder="0"
                  onChange={(e) => setCarryCapacity(e.target.value)}
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label htmlFor="travel-speed">Travel speed</label>
                <input
                  value={travelSpeed}
                  type="number"
                  id="travel-speed"
                  placeholder="0"
                  onChange={(e) => setTravelSpeed(e.target.value)}
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label htmlFor="mining-speed">Mining speed</label>
                <input
                  value={miningSpeed}
                  type="number"
                  id="mining-speed"
                  placeholder="0"
                  onChange={(e) => setMiningSpeed(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={totalPoints <= limit ? "green" : "red"}>
            {totalPoints}/{limit}
          </div>
          {errors.totalPoints && (
            <div className="red">{errors.totalPoints}</div>
          )}
          <div className="actions">
            <button>Save</button>
          </div>
        </form>
      )}
    </>
  );
}

export default CreateMiner;
