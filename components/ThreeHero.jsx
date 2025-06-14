'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'

export default function ThreeHero() {
  return (
    <div className="h-[400px] w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <Box position={[0, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Box>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
