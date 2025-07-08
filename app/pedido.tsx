'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useState } from 'react'
import React from 'react'

const modelos: Record<string, string> = {
  vermelho: '/assets/3D/modelo_vermelho_no.glb',
  azul: '/assets/3D/modelo_azul_no.glb',
  amarelo: '/assets/3D/modelo_amarelo_no.glb',
  verde: '/assets/3D/modelo_verde_no.glb',
}

function Modelo({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function Pedido() {
  const [corSelecionada, setCorSelecionada] = useState('vermelho')

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Modelo url={modelos[corSelecionada]} />
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <h3>Selecione a cor da base:</h3>
        {Object.keys(modelos).map((cor) => (
          <button
            key={cor}
            onClick={() => setCorSelecionada(cor)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: cor,
              color: '#fff',
              border: corSelecionada === cor ? '2px solid black' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {cor}
          </button>
        ))}
      </div>
    </div>
  )
}
