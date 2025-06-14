'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function PandaModel(props) {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/panda.glb');

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive object={scene} ref={modelRef} {...props} />;
}
