import React from "react";
import { Canvas } from "@react-three/fiber";

const ThreeScene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
    </Canvas>
  );
};

export default ThreeScene;
