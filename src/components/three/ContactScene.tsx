import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingOrbs() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.01; });

  const orbs = useMemo(() => [
    { pos: [-1.5, 0.8, -2], color: "#7C5CFF", size: 0.2 },
    { pos: [1.5, -0.5, -1.5], color: "#3BC9FF", size: 0.15 },
    { pos: [0, 1.2, -3], color: "#7C5CFF", size: 0.12 },
    { pos: [-1, -1, -2.5], color: "#3BC9FF", size: 0.1 },
    { pos: [1.2, 0.3, -1], color: "#7C5CFF", size: 0.08 },
  ], []);

  return (
    <group ref={ref}>
      {orbs.map((o, i) => (
        <Float key={i} speed={0.5 + i * 0.3} floatIntensity={0.4}>
          <mesh position={o.pos as [number, number, number]}>
            <sphereGeometry args={[o.size, 24, 24]} />
            <meshPhysicalMaterial color={o.color} roughness={0} metalness={0.1} transparent opacity={0.3} envMapIntensity={1} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });

  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 3);
    }
    return new Float32Array(arr);
  }, []);

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#7C5CFF" transparent opacity={0.1} />
    </lineSegments>
  );
}

export function ContactScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.5} color="#7C5CFF" />
          <FloatingOrbs />
          <ConnectingLines />
        </Suspense>
      </Canvas>
    </div>
  );
}
