import { Physics } from '@react-three/cannon';
import { OrbitControls, Stars, Stats } from '@react-three/drei';
import React, { Fragment, useEffect, useState } from 'react';

import { Checkboard, Checker, Plane } from './components';

let mocked_game: (0 | 1 | 2)[][] = [
  // [0, 0, 0, 1, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

export default function App(): React.ReactElement {
  const [selectedPiece, selectPiece] = useState<string | null>(null);

  useEffect(() => {
    const randRow = Math.floor(Math.random() * 8);
    const randCol = Math.floor(Math.random() * 8);

    mocked_game[randRow][randCol] = 1;
  }, [selectedPiece]);

  return (
    <>
      <Stats />
      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        minDistance={1}
        maxDistance={999}
      />
      <Stars />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Checkboard selectedPiece={selectedPiece} select={selectPiece} />
      <Physics>
        {mocked_game.map((row, i) =>
          row.map((checker, j) => (
            <Fragment key={`key_${i}_${j}`}>
              <Plane />
              {checker && (
                <Checker
                  value={checker}
                  row={i}
                  col={j}
                  selectedPiece={selectedPiece}
                  select={selectPiece}
                />
              )}
            </Fragment>
          ))
        )}
      </Physics>
    </>
  );
}
