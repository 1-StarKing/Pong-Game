import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ThreeScene: React.FC = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;
