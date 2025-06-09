import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type PlayerProps = ThreeElements["mesh"] & {
  color: string;
  playerWidth: number;
};

function Player({ color, playerWidth, ...props }: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [position, setPosition] = useState(0);

  // update player position individually for each player
  // send position to server using websocket to update position for both players
  // server will broadcast the position to all players in the room
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setPosition((prev) => Math.min(prev + playerWidth, 5)); // Adjust the max limit as needed
      } else if (event.key === "ArrowDown") {
        setPosition((prev) => Math.max(prev - playerWidth, -5)); // Adjust the min limit as needed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = position;
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
