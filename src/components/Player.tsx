import * as THREE from "three";
import React, { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type PlayerProps = ThreeElements["mesh"] & {
  color: string;
  playerWidth: number;
  playerHeight: number;
  position: [number, number, number];
  direction: string;
};

function Player({
  color,
  playerWidth,
  playerHeight,
  position,
}: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...(position as [number, number, number]));
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[playerWidth, playerHeight, playerWidth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Player;
