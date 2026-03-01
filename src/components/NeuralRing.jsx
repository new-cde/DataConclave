"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

function RingCore() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
  const t = clock.getElapsedTime();

  if (outerRef.current) {
    outerRef.current.rotation.y += 0.002;
    outerRef.current.rotation.x = -0.3; // tilt back
    outerRef.current.rotation.z = 0.2;  // slight angle
  }

  if (innerRef.current) {
    innerRef.current.rotation.y -= 0.003;
    innerRef.current.rotation.x = -0.3;
    innerRef.current.rotation.z = 0.2;
  }

  const float = Math.sin(t * 0.5) * 0.1;

  if (outerRef.current) outerRef.current.position.y = float;
  if (innerRef.current) innerRef.current.position.y = float;

  if (innerRef.current?.material) {
    innerRef.current.material.emissiveIntensity =
      1 + Math.sin(t * 3) * 0.4;
  }
});
  return (
    <>
      {/* Outer Metallic Ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[2.2, 0.18, 100, 200]} />
        <meshPhysicalMaterial
          color="#0B1120"
          metalness={1}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Inner Neural Glow Ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.7, 0.05, 100, 200]} />
        <meshStandardMaterial
          color="#00C2FF"
          emissive="#00C2FF"
          emissiveIntensity={1}
        />
      </mesh>
    </>
  );
}

export default function NeuralRing() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0.2, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, 3, 5]} intensity={2} color="#00C2FF" />
        <Environment preset="city" />
        <RingCore />
      </Canvas>
    </div>
  );
}