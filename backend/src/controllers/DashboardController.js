const Spot = require('../models/Spot');

module.exports = {
	// Mostrando os spots do usuario logado
	async show(req, res) {
		const { user_id } = req.headers;

		// Filtrando de fato os spots pelo usuario
		const spots = await Spot.find({ user: user_id });

		return res.json(spots);
	}
};
