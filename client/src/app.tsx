import { Physics } from '@react-three/cannon';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import React from 'react';

import { Checkboard, Checker } from './components';

export default function App(): React.ReactElement {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={40}
        near={0.1}
        far={1000}
        aspect={2}
        position={[10, 20, 10]}
      />
      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        minDistance={1}
        maxDistance={999}
      />
      <Stars />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Checkboard />
        <Checker />
      </Physics>
    </>
  );
}
