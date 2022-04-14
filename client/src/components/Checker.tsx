import { CylinderArgs, useCylinder } from '@react-three/cannon';
import React, { memo, useState } from 'react';
import { Color, MeshLambertMaterial } from 'three';

import { CheckerPropTypes } from './types';

const CYLINDER_ARGS: CylinderArgs = [0.4, 0.4, 0.2, 30];

const meshColors = {
  red: new MeshLambertMaterial({
    color: new Color('#91150f'),
  }),
  redHover: new MeshLambertMaterial({
    color: new Color('#91150f'),
    transparent: true,
    opacity: 0.5,
  }),
  white: new MeshLambertMaterial({
    color: new Color('#e6e3c3'),
  }),
  whiteHover: new MeshLambertMaterial({
    color: new Color('#e6e3c3'),
    transparent: true,
    opacity: 0.5,
  }),
};

function Checker({
  value,
  row,
  col,
  selectedPiece,
  select,
}: CheckerPropTypes): JSX.Element {
  const [isHover, setIsHover] = useState(false);

  const name = `Checker ${row} ${col}`;
  const isSelected = name === selectedPiece;

  const materialName =
    value === 1
      ? isHover || isSelected
        ? 'redHover'
        : 'red'
      : isHover || isSelected
      ? 'whiteHover'
      : 'white';

  const [ref] = useCylinder(() => ({
    mass: 10,
    args: CYLINDER_ARGS,
    position: [row, 2, col],
  }));

  const handleClick = () => {
    select(name);
  };

  return (
    <mesh
      ref={ref as any}
      name={name}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      onClick={handleClick}
      material={meshColors[materialName]}
    >
      <cylinderBufferGeometry args={CYLINDER_ARGS} />
    </mesh>
  );
}

export default memo(Checker);
