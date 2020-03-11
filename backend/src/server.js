const express = require('express');
const mongoose = require('mongoose');
// biblioteca para controlar o acesso a api
const cors = require('cors');
// biblioteca para lidar com caminhos
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Coonectando banco de dados
mongoose.connect(
	'mongodb+srv://<usuario>:<senha>@omnistack-jxhrd.mongodb.net/semana09?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

const connectedUsers = {};

io.on('connection', socket => {
	const { user_id } = socket.handshake.query;

	connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});
// Se quisessemos q apenas um dominio pudesse acessar, colocariamos cors({ origin, 'http://nomedodominio'})
app.use(cors());
app.use(express.json());
// Quando acessar esta rota lidar com arquivos estaticos e mostrando onde estao estes arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

// Porta do servidor a ser ouvida
server.listen(3333);
