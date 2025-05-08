import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Player from "./Player";

const ThreeScene: React.FC = () => {
  const planeWidth = 15; // Adjust the scale factor as needed
  const playerWidth = 0.1; // Width of the player

  // Calculate the left edge position
  const leftEdgePosition = -planeWidth / 2 + playerWidth / 2;

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
      <Player position={[leftEdgePosition, 10, 1]} />
      <mesh>
        <planeGeometry args={[planeWidth, 7]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;

/*
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Player from "./Player";

const ThreeScene: React.FC = () => {
  const planeWidth = window.innerWidth / 100; // Adjust the scale factor as needed
  const playerWidth = 0.1; // Width of the player

  // Calculate the left edge position
  const leftEdgePosition = -planeWidth / 2 + playerWidth / 2;

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
      <mesh>
        <Player position={[leftEdgePosition, 0, 0]} />
        <planeGeometry args={[planeWidth, window.innerHeight / 100]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;

*/
