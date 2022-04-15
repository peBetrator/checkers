import { useThree } from '@react-three/fiber';
import React, { memo, useMemo } from 'react';
import { Color, DoubleSide, MeshLambertMaterial, PlaneGeometry } from 'three';

import { CheckboardPropTypes } from './types';

const meshColors = {
  black: new MeshLambertMaterial({
    color: new Color('black'),
    side: DoubleSide,
  }),
  white: new MeshLambertMaterial({
    color: new Color('white'),
    side: DoubleSide,
  }),
};

function Checkboard({
  selectedPiece,
  select,
  movePiece,
}: CheckboardPropTypes): JSX.Element {
  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
  const meshes = [];

  const { scene } = useThree();

  const handleClick = (row: number, col: number) => {
    if (selectedPiece) {
      const selectedObject = scene.children.find(
        ({ name }) => name === selectedPiece
      );

      if (selectedObject) {
        // selectedObject.position.set(row, 0, col);
        movePiece(row, col);
        select(null);
      }
    }
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      meshes.push(
        <mesh
          key={`square ${i} ${j}`}
          name={`square ${i} ${j}`}
          geometry={geometry}
          rotation-x={-Math.PI / 2}
          position={[i, 0, j]}
          material={meshColors[(i + j) % 2 === 0 ? 'white' : 'black']}
          receiveShadow
          onClick={() => handleClick(i, j)}
        />
      );
    }
  }
  return <group name="Checkboard">{meshes}</group>;
}

export default memo(Checkboard);
