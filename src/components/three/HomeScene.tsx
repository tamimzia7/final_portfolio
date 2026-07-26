import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Character() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, -0.5, 0]}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <MeshDistortMaterial color="#7C5CFF" roughness={0.2} metalness={0.8} distort={0.15} speed={2} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.7, 0.9, 0.4]} />
          <meshPhysicalMaterial color="#7C5CFF" roughness={0.1} metalness={0.9} transparent opacity={0.9} />
        </mesh>
        {[0.5, -0.5].map((x, i) => (
          <mesh key={i} position={[x, -0.4, 0]}>
            <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
            <meshPhysicalMaterial color="#3BC9FF" roughness={0.1} metalness={0.7} />
          </mesh>
        ))}
        {[0.35, -0.35].map((x, i) => (
          <mesh key={i} position={[x, 1.2, 0.35]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FloatingObjects() {
  const items = useMemo(() => [
    { pos: [-2.2, 1.5, -2], color: "#7C5CFF", size: 0.15, type: "box" },
    { pos: [2.2, -1.2, -2.5], color: "#3BC9FF", size: 0.12, type: "sphere" },
    { pos: [-1.5, -1.8, -3], color: "#7C5CFF", size: 0.1, type: "tetrahedron" },
    { pos: [1.8, 1.8, -2.8], color: "#3BC9FF", size: 0.13, type: "box" },
  ], []);

  return items.map((obj, i) => (
    <Float key={i} speed={0.8 + i * 0.2} rotationIntensity={0.5 + i * 0.1} floatIntensity={0.6 + i * 0.1}>
      <mesh position={obj.pos as [number, number, number]}>
        {obj.type === "box" ? <boxGeometry args={[obj.size, obj.size, obj.size]} />
          : obj.type === "tetrahedron" ? <tetrahedronGeometry args={[obj.size]} />
          : <sphereGeometry args={[obj.size, 16, 16]} />}
        <meshPhysicalMaterial color={obj.color} roughness={0.1} metalness={0.8} transparent opacity={0.6} />
      </mesh>
    </Float>
  ));
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

function Particles({ mobile = false }: { mobile?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const count = mobile ? 60 : 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3, r = 1.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      const c = new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [mobile]);

  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d * 0.05; ref.current.rotation.x += d * 0.02; } });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={mobile ? 0.015 : 0.02} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function GradientRing({ mobile = false }: { mobile?: boolean }) {
  if (mobile) return null;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.8, -1]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7C5CFF" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]} position={[0.3, -0.5, -1.2]}>
        <torusGeometry args={[1.4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FF2D20" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function HomeScene() {
  const mobile = isMobile;

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={mobile ? { powerPreference: "low-power", antialias: false } : undefined}>
        <Suspense fallback={null}>
          <ambientLight intensity={mobile ? 0.3 : 0.5} />
          {!mobile && <pointLight position={[5, 5, 5]} intensity={1} color="#7C5CFF" />}
          <pointLight position={[-5, -5, 5]} intensity={mobile ? 0.3 : 0.5} color="#3BC9FF" />
          <Character />
          <GradientRing mobile={mobile} />
          <FloatingObjects />
          <Particles mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
