import React from "react";
import { useRecoilValue } from "recoil";
import { asteroidsState } from "../../state/asteroids";

function AsteroidList() {
  const asteroids = useRecoilValue(asteroidsState);

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Minerals</th>
            <th>Current miner</th>
            <th>Position (x, y)</th>
          </tr>
        </thead>

        <tbody>
          {asteroids.map((asteroid) => (
            <tr key={asteroid._id}>
              <td>{asteroid.name}</td>
              <td>{asteroid.minerals}</td>
              <td>
                {asteroid.currentMiner ? asteroid.currentMiner.name : "N/A"}
              </td>
              <td>
                {Math.round(asteroid.position.x)},
                {Math.round(asteroid.position.y)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AsteroidList;
