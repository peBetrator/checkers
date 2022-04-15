import { Physics } from '@react-three/cannon';
import { OrbitControls, Stars, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Fragment, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { Checkboard, Checker, Menu, Modal, Plane } from './components';
import { Game, Color } from './types';

export default function App(): React.ReactElement {
  const [selectedPiece, selectPiece] = useState<string | null>(null);

  const [showMenu, setShowMenu] = useState(true);

  const [gameId, setGameId] = useState<number | null>(null);
  const [game, setGame] = useState({} as Game);
  const [games, setGames] = useState<Game[] | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [color, setColor] = useState<Color | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
    });

    newSocket.on('games', games => {
      setGames(games);
    });

    newSocket.on('your-game-created', gameId => {
      setGameId(gameId);
    });

    newSocket.on('color', color => setColor(color));

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (games?.length) {
      const game = games.find(g => g.id === gameId);

      if (game) {
        console.log('App game ', game);
        setGame(game);
      }
    }
  }, [games, gameId]);

  // useEffect(() => {
  //   const randRow = Math.floor(Math.random() * 8);
  //   const randCol = Math.floor(Math.random() * 8);

  //   mocked_game[randRow][randCol] = 1;
  // }, [selectedPiece]);

  const createGame = () => {
    (socket as Socket).emit('create-game', 'Test Game');
  };

  const joinGame = () => {
    // auto-join test game with ID 1
    (socket as Socket).emit('join-game', 1);
    setGameId(1);
  };

  const movePiece = (di: number, dj: number) => {
    const [_, i = '', j = ''] = selectedPiece?.split(' ') || [];

    (socket as Socket).emit('move-piece', {
      selectedPiece: { i: parseInt(i, 10), j: parseInt(j, 10) },
      destination: { i: di, j: dj },
    });
  };

  return (
    <>
      <Canvas id="canvas" camera={{ position: [10, 5, 10] }}>
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
        <Checkboard
          selectedPiece={selectedPiece}
          select={selectPiece}
          movePiece={movePiece}
        />
        <Physics>
          {game.board?.map((row, i) =>
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
      </Canvas>
      <Modal show={showMenu} closeModal={() => setShowMenu(false)}>
        <Menu createGame={createGame} joinGame={joinGame} />
      </Modal>
    </>
  );
}
