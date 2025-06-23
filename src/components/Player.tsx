import * as THREE from "three";
import React, { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type PlayerProps = ThreeElements["mesh"] & {
  color: string;
  playerWidth: number;
  position: [number, number, number];
};

function Player({ color, playerWidth, position, ...props }: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...(position as [number, number, number]));
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[playerWidth, 1, playerWidth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Player;
