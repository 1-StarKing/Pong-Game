import * as THREE from "three";
import React, { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type PlayerProps = ThreeElements["mesh"] & {
  color: string;
  playerWidth: number;
  position: [number, number, number];
  planeEdges: [number, number, number, number]; // left, right, top, bottom edges
  direction: string;
};

function Player({
  color,
  playerWidth,
  position,
  planeEdges,
  direction,
}: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const playerHeight = 1;
  useFrame(() => {
    if (meshRef.current) {
      //console.log("Top: ", planeEdges[2], "bottom: ", planeEdges[3]);
      //console.log(position[1]);
      //console.log(props);

      // Check if the player is within the vertical bounds of the plane
      if (
        (position[1] > planeEdges[2] - playerHeight / 2 &&
          direction === "up") ||
        (position[1] < planeEdges[2] - playerHeight / 2 && direction === "down")
      ) {
        return;
      }
      meshRef.current.position.set(...(position as [number, number, number]));
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[playerWidth, 1, playerWidth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Player;
