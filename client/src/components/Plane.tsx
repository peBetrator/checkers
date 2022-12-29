import { usePlane } from '@react-three/cannon';
import React from 'react';

/**
 * main floor
 */
export default function Plane(): JSX.Element {
  const [ref] = usePlane(() => ({
    type: 'Static',
    args: [100, 100],
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0], // make plane horizontal
  }));

  return (
    <mesh ref={ref as any} name="Plane">
      <planeBufferGeometry />
    </mesh>
  );
}
