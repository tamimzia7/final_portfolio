import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingCards() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.z += d * 0.01; });

  const cards = useMemo(() => [
    { pos: [-2, 0.5, -3], color: "#7C5CFF", rot: 0.2 },
    { pos: [2, -0.3, -2.5], color: "#3BC9FF", rot: -0.15 },
    { pos: [0, 1.5, -4], color: "#7C5CFF", rot: 0.1 },
  ], []);

  return (
    <group ref={ref}>
      {cards.map((c, i) => (
        <Float key={i} speed={0.5 + i * 0.2} floatIntensity={0.3} rotationIntensity={0.05}>
          <group position={c.pos as [number, number, number]} rotation={[c.rot, c.rot, 0]}>
            <mesh>
              <planeGeometry args={[1.2, 0.8]} />
              <meshPhysicalMaterial color="#0a0a0a" roughness={0.4} metalness={0.3} transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[0.8, 0.3]} />
              <meshBasicMaterial color={c.color} transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function LightParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#7C5CFF" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function ProjectsScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <FloatingCards />
          <LightParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
