import React from "react";
import { useGLTF } from "@react-three/drei/native";

export default function Avatar({ asset, position, rotation }) {
  const { scene } = useGLTF(asset.localUri || "");
  return <primitive object={scene} position={position} rotation={rotation} />;
}
