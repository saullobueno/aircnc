const Booking = require('../models/Booking');

module.exports = {
	// Cadastrando novas reservas
	async store(req, res) {
		// Pegando Id do usario logado
		const { user_id } = req.headers;
		// Pegando id do spot pelos params
		const { spot_id } = req.params;
		// Pegando a data pela requisição
		const { date } = req.body;

		// Cadastrando de fato
		const booking = await Booking.create({
			user: user_id,
			spot: spot_id,
			date
		});

		// Populando os dados (abrindo detalhes dos dados através do ID, ou seja, pegando tambem o nome, email, etc)
		await booking
			.populate('spot')
			.populate('user')
			.execPopulate();

		const ownerSocket = req.connectedUsers[booking.spot.user];

		if (ownerSocket) {
			req.io.to(ownerSocket).emit('booking_request', booking);
		}

		return res.json(booking);
	}
};
