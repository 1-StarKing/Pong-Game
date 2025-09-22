import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Vehicle, ArriveBehavior } from "yuka";

type PlayerProps = ThreeElements["mesh"] & {
  color: string;
  playerWidth: number;
  playerHeight: number;
  position: [number, number, number];
  direction: string;
  targetY?: number;
};

function Player({
  color,
  playerWidth,
  playerHeight,
  position,
  // direction,
  targetY,
}: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const vehicleRef = useRef<Vehicle | null>(null);
  const arriveBehaviorRef = useRef<ArriveBehavior | null>(null);
  // const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3(...position));

  useEffect(() => {
    // Create Yuka vehicle for smooth movement
    const vehicle = new Vehicle();
    vehicle.position.set(position[0], position[1], position[2]);
    vehicle.maxSpeed = 50; // Increased for faster response
    vehicle.maxForce = 1000; // Extremely high force for instant acceleration
    vehicle.mass = 0.05; // Minimal mass for nearly instant response (F=ma, so tiny mass = huge acceleration)

    // Create arrive behavior for smooth movement with deceleration towards target
    const arriveBehavior = new ArriveBehavior();
    arriveBehavior.deceleration = 0.1; // Fast deceleration for more responsive feel
    arriveBehavior.tolerance = 0.01; // Smaller tolerance for more precise stopping
    vehicle.steering.add(arriveBehavior);
    vehicleRef.current = vehicle;
    arriveBehaviorRef.current = arriveBehavior;

    return () => {
      if (vehicleRef.current) {
        vehicleRef.current.steering.clear();
      }
    };
  }, []);

  useEffect(() => {
    // Update target position when targetY changes
    if (
      vehicleRef.current &&
      arriveBehaviorRef.current &&
      targetY !== undefined
    ) {
      arriveBehaviorRef.current.target.set(position[0], targetY, position[2]);
    }
  }, [targetY, position]);

  useFrame((state, delta) => {
    if (vehicleRef.current && meshRef.current) {
      // Update the vehicle
      vehicleRef.current.update(delta);

      // Apply the vehicle's position to the mesh (convert from Yuka Vector3 to Three.js Vector3)
      const yukaPos = vehicleRef.current.position;
      meshRef.current.position.set(yukaPos.x, yukaPos.y, yukaPos.z);
      // setCurrentPosition(meshRef.current.position.clone());
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
