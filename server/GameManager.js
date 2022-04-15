const moveChecker = require('./helpers/moveChecker');

let nextGameId = 1;
const games = [];

const getGameForPlayer = player => {
  return games.find(g => g.players.find(p => p.socket === player));
};

/**
 * @returns List of all existing games
 */
exports.getGames = () =>
  games.map(({ players, ...game }) => ({
    ...game,
    numberOfPlayers: players.length,
  }));

/**
 * Creates new game
 */
exports.createGame = ({ player, name }) => {
  const game = {
    name,
    turn: 'red',
    players: [
      {
        socket: player,
        color: 'red',
      },
    ],
    chat: [],
    id: nextGameId++,
    board: [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
    ],
  };

  games.push(game);

  return game;
};

/**
 * @returns Single game by ID
 */
exports.getGameById = gameId => games.find(g => g.id === gameId);

/**
 * Addds new player to game
 */
exports.addPlayerToGame = ({ player, gameId }) => {
  const game = games.find(g => g.id === gameId);

  game.players.push({
    color: 'white',
    socket: player,
  });

  return 'white';
};

/**
 * Handles checker movement
 */
exports.move = ({ player, selectedPiece, destination }) => {
  const game = getGameForPlayer(player);
  console.log({ game });
  moveChecker({ game, destination, selectedPiece });
};
