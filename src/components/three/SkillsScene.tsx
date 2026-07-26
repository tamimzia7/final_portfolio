import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SkillOrbs() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.01; });

  const orbs = useMemo(() => {
    const count = 30;
    const result = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      result.push({
        pos: [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)],
        color: i % 2 === 0 ? "#7C5CFF" : "#3BC9FF",
        size: 0.03 + Math.random() * 0.05,
        speed: 0.5 + Math.random(),
      });
    }
    return result;
  }, []);

  return (
    <group ref={ref}>
      {orbs.map((o, i) => (
        <Float key={i} speed={o.speed} floatIntensity={0.2}>
          <mesh position={o.pos as [number, number, number]}>
            <sphereGeometry args={[o.size, 8, 8]} />
            <meshPhysicalMaterial color={o.color} emissive={o.color} emissiveIntensity={0.3} transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function SkillsScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <SkillOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
