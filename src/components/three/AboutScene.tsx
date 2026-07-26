import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (groupRef.current) groupRef.current.rotation.y += d * 0.02; });

  const shapes = useMemo(() => [
    { pos: [-1.5, 1.2, -2], color: "#7C5CFF", size: 0.3 },
    { pos: [1.8, -1, -2.5], color: "#3BC9FF", size: 0.25 },
    { pos: [-2, -0.8, -3], color: "#7C5CFF", size: 0.2 },
    { pos: [1.2, 1.5, -1.8], color: "#3BC9FF", size: 0.15 },
  ], []);

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <Float key={i} speed={0.6 + i * 0.2} floatIntensity={0.3}>
          <mesh position={s.pos as [number, number, number]}>
            <icosahedronGeometry args={[s.size, 0]} />
            <MeshDistortMaterial color={s.color} roughness={0.2} metalness={0.6} distort={0.1 + i * 0.05} speed={1.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function AboutScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.8} color="#7C5CFF" />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
