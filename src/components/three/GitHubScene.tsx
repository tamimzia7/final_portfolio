import { Canvas } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ContributionGrid() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.005;
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  const blocks = useMemo(() => {
    const arr = [];
    for (let x = 0; x < 12; x++) {
      for (let z = 0; z < 12; z++) {
        const h = Math.random();
        arr.push({
          pos: [(x - 5.5) * 0.25, h * 0.25 + 0.02, (z - 5.5) * 0.25],
          height: Math.max(h * 0.25, 0.03),
          color: h > 0.7 ? "#7C5CFF" : h > 0.4 ? "#3BC9FF" : "#FF2D20",
          opacity: h > 0.7 ? 0.8 : h > 0.4 ? 0.6 : 0.25,
        });
      }
    }
    return arr;
  }, []);

  return (
    <group ref={ref}>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.pos as [number, number, number]}>
          <boxGeometry args={[0.07, b.height, 0.07]} />
          <meshPhysicalMaterial
            color={b.color}
            transparent
            opacity={b.opacity}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodeWindow() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.003;
  });

  const lines = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      y: 0.3 - i * 0.12,
      width: 0.3 + Math.random() * 0.4,
      color: i < 2 ? "#FF2D20" : i < 4 ? "#7C5CFF" : "#3BC9FF",
    }));
  }, []);

  return (
    <group ref={ref} position={[1.8, 0.2, -0.5]}>
      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.3}>
        <mesh>
          <planeGeometry args={[1.2, 0.9]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.42, 0.01]}>
          <planeGeometry args={[1.05, 0.03]} />
          <meshBasicMaterial color="#FF2D20" transparent opacity={0.6} />
        </mesh>
        {lines.map((line, i) => (
          <mesh key={i} position={[-0.5 + line.width / 2, line.y, 0.01]}>
            <planeGeometry args={[line.width, 0.02]} />
            <meshBasicMaterial color={line.color} transparent opacity={0.4} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

function GitBranch() {
  const ref = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 1; t += 0.02) {
      const x = Math.sin(t * Math.PI * 4) * 0.3;
      const y = t * 0.8 - 0.4;
      const z = Math.cos(t * Math.PI * 4) * 0.3;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.005;
  });

  return (
    <group ref={ref} position={[-1.8, -0.3, -0.8]}>
      <Float speed={2} rotationIntensity={0.01} floatIntensity={0.2}>
        <mesh>
          <tubeGeometry args={[curve, 64, 0.015, 8, false]} />
          <meshPhysicalMaterial color="#7C5CFF" transparent opacity={0.5} roughness={0.1} metalness={0.3} />
        </mesh>
        <mesh position={[0.3, 0.4, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#7C5CFF" />
        </mesh>
        <mesh position={[-0.3, -0.3, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#3BC9FF" />
        </mesh>
      </Float>
    </group>
  );
}

function LaravelIcon() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.008;
  });

  return (
    <group ref={ref} position={[0, 0.6, -1.2]}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshPhysicalMaterial
            color="#FF2D20"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.5}
            emissive="#FF2D20"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshBasicMaterial color="#FF2D20" transparent opacity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
      <ringGeometry args={[1.8, 1.82, 64]} />
      <meshBasicMaterial color="#7C5CFF" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

function SecondRing() {
  return (
    <mesh rotation={[Math.PI / 2.5, 0.3, 0]} position={[0, 0.2, 0]}>
      <ringGeometry args={[2.2, 2.22, 64]} />
      <meshBasicMaterial color="#FF2D20" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function GitHubScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0.8, 4.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[2, 3, 2]} intensity={0.8} color="#7C5CFF" />
          <pointLight position={[-2, 1, 2]} intensity={0.4} color="#FF2D20" />
          <ContributionGrid />
          <CodeWindow />
          <GitBranch />
          <LaravelIcon />
          <OrbitRing />
          <SecondRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
