import React, { useState, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MyContext } from "../ContextProvider";
import Player from "./Player";

const ThreeScene: React.FC = () => {
  const { players } = useContext(MyContext);
  const [planeWidth, setPlaneWidth] = useState(window.innerWidth / 140);
  const playerWidth = 0.1; // Width of the player

  // Calculate the left edge position
  const leftEdgePosition = -planeWidth / 2 + playerWidth / 2 + playerWidth; // Dynamically calculate left edge position
  const rightEdgePosition = planeWidth / 2 - playerWidth / 2 - playerWidth; // Dynamically calculate right edge position
  // const playerPositions = [leftEdgePosition, rightEdgePosition];

  useEffect(() => {
    const handleResize = () => {
      setPlaneWidth(window.innerWidth / 140);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              playerWidth={playerWidth}
              color={player.color} // Cycle through colors
            />
          );
        })}
      <mesh>
        <planeGeometry args={[planeWidth, 7]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;
