/**
 * Planet popup
 */

import React from "react";
import { useRecoilValue } from "recoil";
import { minerStatusesState } from "../../state/miners";

function PlanetPopup({ miners }) {
  const minerStatuses = useRecoilValue(minerStatusesState);

  return (
    <div className="scrollable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Carry capacity</th>
            <th>Travel speed</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {miners.map((miner) => (
            <tr key={miner._id}>
              <td>{miner.name}</td>
              <td>
                {miner.minerals}/{miner.carryCapacity}
              </td>
              <td>{miner.travelSpeed}</td>
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
    </div>
  );
}

export default React.memo(PlanetPopup);
