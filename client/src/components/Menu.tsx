import React from 'react';

import { MenuPropTypes } from './types';

export default function Menu({
  createGame,
  joinGame,
}: MenuPropTypes): JSX.Element {
  return (
    <div>
      <button type="button" onClick={createGame}>
        Create Game
      </button>
      <button type="button" onClick={joinGame}>
        Join Game
      </button>
    </div>
  );
}
