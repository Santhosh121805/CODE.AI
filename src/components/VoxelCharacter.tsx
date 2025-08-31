import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface VoxelCharacterProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  pulseGlow?: boolean;
  bounceAnimation?: boolean;
}

const VoxelMesh: React.FC<VoxelCharacterProps> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#8B5CF6',
  pulseGlow = false,
  bounceAnimation = false,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Bounce animation
    if (bounceAnimation) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    // Head bob animation
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }

    // Gentle breathing
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  const materials = useMemo(() => ({
    head: new THREE.MeshStandardMaterial({ color: color }),
    body: new THREE.MeshStandardMaterial({ color: color }),
    eyes: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.2 }),
    accent: new THREE.MeshStandardMaterial({ color: '#00FFFF', emissive: '#00FFFF', emissiveIntensity: 0.1 }),
  }), [color]);

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]} material={materials.head}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.41]} material={materials.eyes}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
      </mesh>
      <mesh position={[0.15, 1.6, 0.41]} material={materials.eyes}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
      </mesh>

      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]} material={materials.body}>
        <boxGeometry args={[1, 1.2, 0.6]} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 0.8, 0]} material={materials.body}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
      </mesh>
      <mesh position={[0.8, 0.8, 0]} material={materials.body}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, -0.5, 0]} material={materials.body}>
        <boxGeometry args={[0.3, 1, 0.3]} />
      </mesh>
      <mesh position={[0.3, -0.5, 0]} material={materials.body}>
        <boxGeometry args={[0.3, 1, 0.3]} />
      </mesh>

      {/* Accent details */}
      <mesh position={[0, 0.5, 0.31]} material={materials.accent}>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
      </mesh>
    </group>
  );
};

export const VoxelCharacter: React.FC<VoxelCharacterProps & { className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00FFFF" />
        <VoxelMesh {...props} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export const VoxelScene: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      {/* Main character */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 pulse-glow">
        <VoxelCharacter
          position={[0, 0, 0]}
          scale={1.2}
          color="#8B5CF6"
          pulseGlow={true}
          bounceAnimation={true}
        />
      </div>

      {/* Left character */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-32 h-32 opacity-80">
        <VoxelCharacter
          position={[0, 0, 0]}
          scale={0.8}
          color="#EC4899"
          bounceAnimation={true}
        />
      </div>

      {/* Right character */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-32 opacity-80">
        <VoxelCharacter
          position={[0, 0, 0]}
          scale={0.8}
          color="#06B6D4"
          bounceAnimation={true}
        />
      </div>

      {/* Speech bubble */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-neon-purple/30 rounded-2xl p-4 max-w-sm">
        <div className="text-sm text-neon-cyan font-medium">
          "Unlock new opportunities with AI Workflows!"
        </div>
        <div className="absolute bottom-0 left-1/2 transform translate-y-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
      </div>
    </div>
  );
};