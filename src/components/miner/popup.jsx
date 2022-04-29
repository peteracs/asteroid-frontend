/**
 * Miner popup
 */

import React from "react";
import moment from "moment";

const HistoryModelStatusText = {
  1: "Miner Spawn on Planet",
  2: "Traveling from Planet",
  3: "Mining Asteroid",
  4: "Traveling back from Asteroid",
  5: "Transferring minerals to Planet",
};

function MinerPopup({ histories }) {
  return (
    <div className="scrollable">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Year</th>
            <th>Planet</th>
            <th>Carry capacity</th>
            <th>Travel speed</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {histories.map((history) => (
            <tr key={history._id}>
              <td>{moment(history.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
              <td>{history.year}</td>
              <td>{history.planet}</td>
              <td>
                {history.capacity.current}/{history.capacity.max}
              </td>
              <td>{history.speed.travel}</td>
              <td>{history.speed.mining}</td>
              <td>
                ({history.position.x})/({history.position.y})
              </td>
              <td>{HistoryModelStatusText[history.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(MinerPopup);
