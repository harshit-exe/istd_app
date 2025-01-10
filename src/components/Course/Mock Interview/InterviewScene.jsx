import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef(null)

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: async (next) => {
      while (true) {
        await next({ rotation: [0, Math.PI * 2, 0], config: { duration: 10000 } })
      }
    },
  })

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return <animated.primitive object={scene} ref={modelRef} rotation={rotation} />
}

export function InterviewScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url="/models/interviewer.glb" />
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  )
}

