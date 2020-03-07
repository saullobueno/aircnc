const User = require('../models/User');

module.exports = {
	// Criando usuario pelo email
	async store(req, res) {
		const { email } = req.body;

		// Verificando se usuario ja tem cadastro
		let user = await User.findOne({ email });

		// Se não existe, cadastra.
		if (!user) {
			user = await User.create({ email });
		}

		return res.json(user);
	}
};
