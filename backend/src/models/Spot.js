const mongoose = require('mongoose');

// Model Spot
const SpotSchema = new mongoose.Schema(
	{
		thumbnail: String,
		company: String,
		price: Number,
		techs: [String],
		// Fazendo referencia ao model User
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		toJSON: {
			virtuals: true
		}
	}
);
// Criando uma propriedade virtual e criando a url do thumbnail
SpotSchema.virtual('thumbnail_url').get(function() {
	return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);
