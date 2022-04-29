/**
 * Main app layout
 */
import Header from "./header.jsx";
import Nav from "./nav.jsx";
import Miners from "../miner/list.jsx";
import Asteroids from "../asteroid/list.jsx";
import Planets from "../planet/list.jsx";
import useWebsocket from "../../hooks/websocket";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./map";
import { useRecoilValue } from "recoil";
import { socketState } from "../../state/socket";

function App() {
  const socket = useRecoilValue(socketState);

  useWebsocket();

  return (
    <Router>
      <div className="container">
        <main>
          <Header />
          <Nav />

          <Switch>
            <Route path="/miners">
              <Miners />
            </Route>
            <Route path="/asteroids">
              <Asteroids />
            </Route>
            <Route path="/planets">
              <Planets />
            </Route>
          </Switch>
        </main>
        <Map />
      </div>
      {!socket && (
        <div className="socket-loader">
          <p>Waiting for websocket connection.</p>
        </div>
      )}
    </Router>
  );
}

export default App;
