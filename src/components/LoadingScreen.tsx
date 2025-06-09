import React, { useContext } from "react";
import { MyContext } from "../ContextProvider";

const LoadingScreen = () => {
  const { players } = useContext(MyContext);
  // console.log(players);

  if (players.length === 1) return <div>Waiting for players</div>;

  return <></>;
};

export default LoadingScreen;
