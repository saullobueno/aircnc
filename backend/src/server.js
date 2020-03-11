const express = require('express');
const mongoose = require('mongoose');
// biblioteca para controlar o acesso a api
const cors = require('cors');
// biblioteca para lidar com caminhos
const path = require('path');
// protocolo realtime socketio
const socketio = require('socket.io');
// protocolo http
const http = require('http');

const routes = require('./routes');

// abstraindo os protocolos em variaveis diferentes e colocando para ouvir tanto um quanto o outro
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

// criando objeto de usuarios conectados
const connectedUsers = {};

// conectando o io a todos os usuarios logados pelo id
io.on('connection', socket => {
	// pegando o id do usuario conectado
	const { user_id } = socket.handshake.query;
	// todo socket conectado tem sua id unica e passamos ele para o connectedUsers
	connectedUsers[user_id] = socket.id;
});
// o next continua as funcionalidades
app.use((req, res, next) => {
	// dando conexao aos usuarios conectados para toda a aplicação
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
