import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Ball = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Update ball position or other properties here
    }
  });

  // NEXT TIME IMPLEMENT PHYSICS LIBRARY (CANNON.JS / RAPIDPHYSICS) FOR BALL MOVEMENT AND COLLISIONS

  return (
    <mesh ref={meshRef} position={[0, 0, 0.15]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Ball;