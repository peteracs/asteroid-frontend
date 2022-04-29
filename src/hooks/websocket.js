import { useSetRecoilState } from "recoil";
import socket from "../websocket";
import { minersState } from "../state/miners";
import { planetsState } from "../state/planets";
import { asteroidsState } from "../state/asteroids";
import { tickState } from "../state/tick";
import { socketState } from "../state/socket";

const useWebsocket = () => {
  const setMiners = useSetRecoilState(minersState);
  const setPlanets = useSetRecoilState(planetsState);
  const setAsteroids = useSetRecoilState(asteroidsState);
  const setTick = useSetRecoilState(tickState);
  const setSocket = useSetRecoilState(socketState);

  socket.on("connect", () => {
    setSocket(true);
  });

  socket.on("disconnect", () => {
    setSocket(false);
  });

  socket.on("tick", (...data) => {
    if (
      data[0] &&
      data[0].miners &&
      data[0].planets &&
      data[0].asteroids &&
      data[0].currentTick
    ) {
      setMiners(data[0].miners);
      setPlanets(data[0].planets);
      setAsteroids(data[0].asteroids);
      setTick(data[0].currentTick);
    }
  });
};

export default useWebsocket;
