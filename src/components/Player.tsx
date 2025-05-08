import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

function Player(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setPosition((prev) => Math.min(prev + 0.1, 5)); // Adjust the max limit as needed
      } else if (event.key === "ArrowDown") {
        setPosition((prev) => Math.max(prev - 0.1, -5)); // Adjust the min limit as needed
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
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default Player;

/*
import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

function Player(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [position, setPosition] = useState(props.position[1]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setPosition((prev) => Math.min(prev + 0.1, 5)); // Adjust the max limit as needed
      } else if (event.key === "ArrowDown") {
        setPosition((prev) => Math.max(prev - 0.1, -5)); // Adjust the min limit as needed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(props.position[0], position, props.position[2]);
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default Player;
*/
