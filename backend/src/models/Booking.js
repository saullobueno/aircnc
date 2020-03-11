const mongoose = require('mongoose');

// Model das reservas
const BookingSchema = new mongoose.Schema({
	date: String,
	// começa como nulo
	approved: Boolean,
	// Fazendo referencia ao model User
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// Fazendo referencia ao model Spot
	spot: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Spot'
	}
});

module.exports = mongoose.model('Booking', BookingSchema);
