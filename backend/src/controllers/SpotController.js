const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
	// Exibindo lista de locais disponiveis para reserva
	async index(req, res) {
		const { tech } = req.query;
		// Filtrando pelas tecnologias
		const spots = await Spot.find({ techs: tech });
		return res.json(spots);
	},

	async store(req, res) {
		// Pegando o arquivo pela requisição no formato multipart
		const { filename } = req.file;
		// Pegando demais dados pela requisição
		const { company, techs, price } = req.body;
		// Pegando o usuario logado pelos headers
		const { user_id } = req.headers;

		// Passando o usuario logado
		const user = await User.findById(user_id);

		// Se nao estiver na sessao retorna erro
		if (!user) {
			return res.status(400).json({ error: 'User does not exists' });
		}

		// Cadastra o spot de fato
		const spot = await Spot.create({
			user: user_id,
			thumbnail: filename,
			company,
			techs: techs.split(',').map(tech => tech.trim()),
			price
		});

		return res.json(spot);
	}
};
