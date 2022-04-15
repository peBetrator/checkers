const { move } = require('../GameManager');
const sendGames = require('../helpers/sendGames');

module.exports =
  ({ io, socket }) =>
  ({ selectedPiece, destination }) => {
    console.log({ selectedPiece, destination });
    move({
      player: socket,
      selectedPiece,
      destination,
    });

    sendGames(io);
  };
