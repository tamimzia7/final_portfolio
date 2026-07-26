import { Canvas } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Astronaut() {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.6}>
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.6, 0.2]}>
          <planeGeometry args={[0.2, 0.08]} />
          <meshBasicMaterial color="#7C5CFF" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.25]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
        </mesh>
        {[[0.35, 0.2, 0], [-0.35, 0.2, 0], [0.3, -0.35, 0], [-0.3, -0.35, 0]].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <capsuleGeometry args={[0.06, 0.2, 6, 12]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={500} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function NotFoundScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={0.8} color="#7C5CFF" />
          <Astronaut />
          <Stars />
          <Text position={[0, -1.5, 0]} fontSize={0.15} color="#7C5CFF" anchorX="center" anchorY="middle" font="/fonts/JetBrainsMono-Regular.ttf">
            LOST IN SPACE
          </Text>
        </Suspense>
      </Canvas>
    </div>
  );
}
