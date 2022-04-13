import { CylinderArgs, useCylinder } from '@react-three/cannon';
import React from 'react';

const CYLINDER_ARGS: CylinderArgs = [0.4, 0.4, 0.3, 15];

export default function Checker(): JSX.Element {
  const [ref, api] = useCylinder(() => ({
    mass: 1,
    args: CYLINDER_ARGS,
    position: [-2, 2, -3],
  }));

  return (
    <mesh
      ref={ref as any}
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
    >
      <cylinderBufferGeometry attach="geometry" args={CYLINDER_ARGS} />
      <meshLambertMaterial attach="material" color="#7a1c1c" />
    </mesh>
  );
}
