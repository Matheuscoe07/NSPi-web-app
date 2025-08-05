import React, { useState, Suspense, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { criarPedidoSimples } from '../src/lib/criarPedido';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

type CorItem = {
  id: number;
  cor: string | any;
  imagem: any;
  corHex?: string;
};

// Componente do suporte 3D procedural
function Suporte3D({ cor }: { cor: string }) {
  const meshRef = useRef<THREE.Group>(null);

  // Animação suave de rotação
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Base do suporte */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.3, 16]} />
        <meshStandardMaterial color={cor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Haste principal */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={cor} roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Suporte do celular - parte de trás */}
      <mesh position={[0, 0.5, 0.4]}>
        <boxGeometry args={[1.0, 1.2, 0.1]} />
        <meshStandardMaterial color={cor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Apoio inferior */}
      <mesh position={[0, -0.2, 0.6]}>
        <boxGeometry args={[1.0, 0.15, 0.4]} />
        <meshStandardMaterial color={cor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Detalhes decorativos */}
      <mesh position={[0, 0.9, 0.35]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh position={[-0.3, 0.3, 0.35]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh position={[0.3, 0.3, 0.35]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Componente de loading para 3D
function Loading3D() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

// Visualizador 3D
function Viewer3D({ cor }: { cor: string }) {
  return (
    <Canvas
      style={styles.canvas3d}
      camera={{ position: [3, 2, 4], fov: 50 }}
    >
      {/* Iluminação ambiente */}
      <ambientLight intensity={0.4} />
      
      {/* Luz principal */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Luz de preenchimento */}
      <pointLight position={[-5, 5, 2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[5, -2, -2]} intensity={0.3} color="#4a90e2" />
      
      {/* Plano de fundo sutil */}
      <mesh position={[0, -2, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" opacity={0.3} transparent />
      </mesh>
      
      <Suspense fallback={<Loading3D />}>
        <Suporte3D cor={cor} />
      </Suspense>
    </Canvas>
  );
}

const coresSuporte: CorItem[] = [
  { 
    id: 1, 
    cor: 'blue', 
    corHex: '#4a90e2',
    imagem: require('../assets/images/sup_azul.png'),
  },
  { 
    id: 2, 
    cor: 'red', 
    corHex: '#e74c3c',
    imagem: require('../assets/images/sup_vermelho.png'),
  },
  { 
    id: 3, 
    cor: 'yellow', 
    corHex: '#f1c40f',
    imagem: require('../assets/images/sup_amarelo.png'),
  },
  { 
    id: 4, 
    cor: 'green', 
    corHex: '#27ae60',
    imagem: require('../assets/images/sup_verde.png'),
  },
];

const coresBase: CorItem[] = [
  { id: 5, cor: 'black', imagem: require('../assets/images/ba_preto.png') },
  { id: 6, cor: 'lightgray', imagem: require('../assets/images/ba_cinzaCA.png') },
  { id: 8, cor: 'darkgray', imagem: require('../assets/images/ba_cinzaES.png') },
  { id: 9, cor: 'white', imagem: require('../assets/images/ba_branco.png') },
  { id: 10, cor: require('../assets/images/transparente.png'), imagem: require('../assets/images/ba_transparente.png') },
];

export default function Pedido() {
  const [corSuporte, setCorSuporte] = useState<CorItem>(coresSuporte[0]);
  const [corBase, setCorBase] = useState<CorItem>(coresBase[0]);
  const [etapa, setEtapa] = useState<'suporte' | 'base'>('suporte');

  const handleFeito = async () => {
    const usuarioIdString = await AsyncStorage.getItem('usuario_id');
    const id_usuario = usuarioIdString ? parseInt(usuarioIdString, 10) : null;

    if (!id_usuario) {
      Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
      return;
    }

    const nome_customizado = `Suporte ${corSuporte.cor} + Base ${corBase.cor}`;
    const result = await criarPedidoSimples({
      id_usuario,
      id_base: corBase.id,
      id_suporte: corSuporte.id,
      nome_customizado,
    });

    if (result.error) {
      Alert.alert('Erro', result.error);
    } else {
      router.push('/confirmado');
    }
  };

  const renderCores = (
    lista: Array<CorItem>,
    selecionado: CorItem,
    setSelecionado: React.Dispatch<React.SetStateAction<CorItem>>
  ) => (
    <View style={styles.listaCores}>
      {lista.map((item, index) => {
        const isSelecionado = selecionado.cor === item.cor;
        return (
          <Pressable
            key={index}
            onPress={() => setSelecionado(item)}
            style={[styles.bolinhaWrapper, isSelecionado && styles.selecionado]}
          >
            {typeof item.cor === 'string' ? (
              <View style={[styles.bolinha, { backgroundColor: item.cor }]} />
            ) : (
              <View style={styles.bolinha}>
                <Image source={item.cor} style={styles.bolinhaImagem} />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleFeito} style={styles.prontoBotao}>
          <Text style={styles.prontoTexto}>Pronto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.visualizacao}>
        {etapa === 'suporte' ? (
          <Viewer3D cor={corSuporte.corHex || corSuporte.cor} />
        ) : (
          <Image
            source={corBase.imagem}
            style={styles.imagem}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.controles}>
        <TouchableOpacity onPress={() => setEtapa(etapa === 'suporte' ? 'base' : 'suporte')}>
          <Text style={styles.seta}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.etapaTitulo}>{etapa === 'suporte' ? 'Suporte' : 'Base'}</Text>

        <TouchableOpacity onPress={() => setEtapa(etapa === 'suporte' ? 'base' : 'suporte')}>
          <Text style={styles.seta}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {etapa === 'suporte'
        ? renderCores(coresSuporte, corSuporte, setCorSuporte)
        : renderCores(coresBase, corBase, setCorBase)}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  topBar: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  prontoBotao: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
  },
  prontoTexto: {
    fontSize: 14,
  },
  visualizacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
    height: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
  },
  canvas3d: {
    width: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
    height: Platform.OS === 'web' ? width * 0.4 : width * 0.8,
  },
  controles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  etapaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seta: {
    fontSize: 24,
  },
  listaCores: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  bolinhaWrapper: {
    padding: 4,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  selecionado: {
    borderColor: '#000',
    borderWidth: 3,
  },
  bolinha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bolinhaImagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});