import { usePlane } from '@react-three/cannon';
import React from 'react';
import { DoubleSide } from 'three';

const SIZE = 8; // checkerboard size is 8x8

export default function Checkboard(): JSX.Element {
  const colsRef = new Array(SIZE).fill(null);
  const rowsRef = new Array(SIZE).fill(null);

  usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0], // make plane horizontal
  }));

  return (
    <>
      {colsRef.map((_, i) =>
        rowsRef.map((_, j) => (
          <mesh
            key={`square_${i}_${j}`}
            position={[i - 3, 0, j - 3]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[1, 1]} />
            <meshLambertMaterial
              attach="material"
              color={(i + j) % 2 === 0 ? 'white' : 'black'}
              side={DoubleSide}
            />
          </mesh>
        ))
      )}
    </>
  );
}
