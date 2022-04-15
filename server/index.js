const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const createGameFactory = require('./handlers/createGameFactory');
const joinGameFactory = require('./handlers/joinGameFactory');
const moveCheckerFactory = require('./handlers/moveCheckerFactory');

const sendGames = require('./helpers/sendGames');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', socket => {
  sendGames(socket);

  socket.on('create-game', createGameFactory({ io, socket }));

  socket.on('join-game', joinGameFactory({ io, socket }));

  socket.on('move-piece', moveCheckerFactory({ io, socket }));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
