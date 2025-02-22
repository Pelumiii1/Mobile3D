import React, { Suspense, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei/native";
import { useAssets } from "expo-asset";

import Avatar from "./components/Avatar";
import Controls from "./components/Controls";
import ToggleButton from "./components/ToggleButton";

export default function App() {
  const [assets, setAssets] = useState(null);
  const [malePosition, setMalePosition] = useState([-0.6, -0.5, 0]);
  const [maleRotation, setMaleRotation] = useState([0, Math.PI / 2, 0]);
  const [femalePosition, setFemalePosition] = useState([0.5, -0.5, 0]);
  const [femaleRotation, setFemaleRotation] = useState([0, -Math.PI / 2, 0]);
  const [activeAvatar, setActiveAvatar] = useState("male");

  // Load assets using useAssets
  const [loadedAssets, error] = useAssets([
    require("./assets/male.glb"),
    require("./assets/female.glb"),
    require("./assets/sunflowers.hdr"),
  ]);

  // Update assets state once loaded
  if (loadedAssets && !assets) {
    setAssets(loadedAssets);
  }

  // Show ActivityIndicator while assets are loading
  if (!assets) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Function to move the active avatar
  const moveAvatar = (direction) => {
    if (activeAvatar === "male") {
      const [x, y, z] = malePosition;
      const [rx, ry, rz] = maleRotation;
      const moveDistance = direction === "forward" ? 0.2 : -0.2;
      const newX = x + Math.sin(ry) * moveDistance;
      const newZ = z + Math.cos(ry) * moveDistance;
      setMalePosition([newX, y, newZ]);
    } else {
      const [x, y, z] = femalePosition;
      const [rx, ry, rz] = femaleRotation;
      const moveDistance = direction === "forward" ? 0.2 : -0.2;
      const newX = x + Math.sin(ry) * moveDistance;
      const newZ = z + Math.cos(ry) * moveDistance;
      setFemalePosition([newX, y, newZ]);
    }
  };

  // Function to rotate the active avatar
  const rotateAvatar = (direction) => {
    if (activeAvatar === "male") {
      const [x, y, z] = maleRotation;
      setMaleRotation([
        x,
        y + (direction === "left" ? -Math.PI / 4 : Math.PI / 4),
        z,
      ]);
    } else {
      const [x, y, z] = femaleRotation;
      setFemaleRotation([
        x,
        y + (direction === "left" ? -Math.PI / 4 : Math.PI / 4),
        z,
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 30 }}
        onCreated={(state) => {
          const _gl = state.gl.getContext();

          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args) {
            const [parameter] = args;

            switch (parameter) {
              // expo-gl only supports the flipY param
              case _gl.UNPACK_FLIP_Y_WEBGL:
                return pixelStorei(...args);
            }
          };
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Avatar
            asset={assets[0]}
            position={malePosition}
            rotation={maleRotation}
          />
          <Avatar
            asset={assets[1]}
            position={femalePosition}
            rotation={femaleRotation}
          />
          {assets[2] && <Environment files={assets[2].localUri} background />}
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Toggle buttons for selecting avatar */}
      <View style={styles.toggleContainer}>
        <ToggleButton
          label="♂ Male"
          isActive={activeAvatar === "male"}
          onPress={() => setActiveAvatar("male")}
        />
        <ToggleButton
          label="♀ Female"
          isActive={activeAvatar === "female"}
          onPress={() => setActiveAvatar("female")}
        />
      </View>

      {/* Controls for the active avatar */}
      {activeAvatar && (
        <Controls
          label={activeAvatar === "male" ? "Male Avatar" : "Female Avatar"}
          onRotateLeft={() => rotateAvatar("left")}
          onRotateRight={() => rotateAvatar("right")}
          onMoveForward={() => moveAvatar("forward")}
          onMoveBackward={() => moveAvatar("backward")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
