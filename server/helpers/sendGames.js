const { getGames } = require('../GameManager');

module.exports = sender => {
  sender.emit('games', getGames());
};
