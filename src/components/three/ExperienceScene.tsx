import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TimelinePath() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });

  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 20;
      const angle = t * Math.PI * 2;
      const r = 2 + t * 0.5;
      arr.push({
        pos: [r * Math.cos(angle), (t - 0.5) * 2, r * Math.sin(angle)],
        color: i % 2 === 0 ? "#7C5CFF" : "#3BC9FF",
        size: 0.04 + t * 0.02,
      });
    }
    return arr;
  }, []);

  return (
    <group ref={ref}>
      {dots.map((d, i) => (
        <Float key={i} speed={0.3} floatIntensity={0.1}>
          <mesh position={d.pos as [number, number, number]}>
            <sphereGeometry args={[d.size, 12, 12]} />
            <meshPhysicalMaterial color={d.color} emissive={d.color} emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ExperienceScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <TimelinePath />
        </Suspense>
      </Canvas>
    </div>
  );
}
