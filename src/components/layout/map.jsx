import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { minersState } from "../../state/miners";
import { planetsState } from "../../state/planets";
import { asteroidsState } from "../../state/asteroids";
import minerIcon from "../../styles/images/miner-icon.png";
import planetIcon from "../../styles/images/planet-icon.png";
import asteroidIcon from "../../styles/images/asteroid-icon.png";
import { tickState } from "../../state/tick";

function Map() {
  const mapContainer = useRef(null);

  const [parentHeight, setParentHeight] = useState(null);
  const [parentWidth, setParentWidth] = useState(null);

  const tick = useRecoilValue(tickState);
  const miners = useRecoilValue(minersState);
  const planets = useRecoilValue(planetsState);
  const asteroids = useRecoilValue(asteroidsState);

  useEffect(() => {
    function handleResize() {
      setParentWidth(mapContainer.current.offsetWidth);
      setParentHeight(mapContainer.current.offsetHeight);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="map-container" ref={mapContainer}>
      <div className="current-year">Current year {tick}</div>
      {miners.map((miner) => {
        const width = 15;
        const height = 15;
        return (
          <img
            width={width}
            height={height}
            key={miner._id}
            style={{
              zIndex: 2,
              position: "absolute",
              top: parentHeight * (miner.y / 999) - width / 2 + "px",
              left: parentWidth * (miner.x / 999) - height / 2 + "px",
              transform: `rotate(${miner.angle + 90}deg)`,
            }}
            src={minerIcon}
            alt={"miner icon"}
          />
        );
      })}
      {planets.map((planet) => {
        const width = 50;
        const height = 50;
        return (
          <React.Fragment key={planet._id}>
            <img
              width={50}
              height={50}
              style={{
                zIndex: 1,
                position: "absolute",
                top:
                  parentHeight * (planet.position.y / 999) - height / 2 + "px",
                left:
                  parentWidth * (planet.position.x / 999) - width / 2 + "px",
              }}
              src={planetIcon}
              alt={"planet icon"}
            />
            <span
              className="planet-minerals"
              style={{
                zIndex: 1,
                position: "absolute",
                top:
                  parentHeight * (planet.position.y / 999) + height - 20 + "px",
                left: parentWidth * (planet.position.x / 999) - width + "px",
                color: planet.minerals > 1000 ? "#00CF67" : "hidden",
              }}
            >
              {planet.minerals}/1000
            </span>
          </React.Fragment>
        );
      })}
      {asteroids.map((asteroid) => {
        const width = 30;
        const height = 30;
        return (
          <img
            width={width}
            height={height}
            key={asteroid._id}
            style={{
              zIndex: 1,
              position: "absolute",
              top:
                parentHeight * (asteroid.position.y / 999) - width / 2 + "px",
              left:
                parentWidth * (asteroid.position.x / 999) - height / 2 + "px",
            }}
            src={asteroidIcon}
            alt={"asteroid icon"}
          />
        );
      })}
    </aside>
  );
}

export default Map;
