import React, { Suspense, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei/native';
import * as THREE from 'three';

const { width } = Dimensions.get('window');

type Model3DProps = {
  modelPath: any;
};

type Viewer3DProps = {
  modelPath: any;
};

// Componente do modelo 3D
function Model3D({ modelPath }: Model3DProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Animação de rotação automática suave
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Clona a cena para evitar conflitos se usado múltiplas vezes
  const clonedScene = scene.clone();

  return (
    <primitive 
      ref={modelRef}
      object={clonedScene} 
      scale={[1.5, 1.5, 1.5]}
      position={[0, 0, 0]}
    />
  );
}

// Componente de loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

// Configuração de iluminação
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
}

export default function Viewer3D({ modelPath }: Viewer3DProps) {
  return (
    <View style={styles.container}>
      <Canvas
        style={styles.canvas}
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Lighting />
        
        <Suspense fallback={<LoadingFallback />}>
          <Model3D modelPath={modelPath} />
        </Suspense>
        
        {Platform.OS === 'web' && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            autoRotate={false}
          />
        )}
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
    height: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
  },
}); 