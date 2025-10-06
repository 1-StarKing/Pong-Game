import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MyContext } from "../ContextProvider";
import Player from "./Player";
import Ball from "./Ball";
import {
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLANE_HEIGHT,
  PLANE_WIDTH,
} from "../const";

/**************************************************************
 FIND A WAY TO MAKE PLAYER MOVEMENT SMOOTHER
**************************************************************/

const ThreeScene: React.FC = () => {
  const { players } = useContext(MyContext);
  //const [planeWidth, setPlaneWidth] = useState(window.innerWidth / 140);

  // Calculate the left and right edge positions
  const leftEdgePosition = -PLANE_WIDTH / 2 + PLAYER_WIDTH / 2 + PLAYER_WIDTH; // Dynamically calculate left edge position
  const rightEdgePosition = PLANE_WIDTH / 2 - PLAYER_WIDTH / 2 - PLAYER_WIDTH; // Dynamically calculate right edge position


  // useEffect(() => {
  //   const handleResize = () => {
  //     setPlaneWidth(window.innerWidth / 140);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {players.length &&
        players.map((player) => {
          return (
            <Player
              key={player.playerID}
              position={[
                player.color === "red" ? leftEdgePosition : rightEdgePosition,
                player.positionY,
                0.05,
              ]}
              targetY={player.positionY}
              playerWidth={PLAYER_WIDTH}
              playerHeight={PLAYER_HEIGHT}
              color={player.color} // Cycle through colors
              direction={player.direction}
            />
          );
        })}
      <mesh>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Ball />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;
