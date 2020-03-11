const Booking = require('../models/Booking');

module.exports = {
	async store(req, res) {
		const { booking_id } = req.params;
		// procurando pela id de acordo com o spot
		const booking = await Booking.findById(booking_id).populate('spot');
		// setando a propriedade q antes estava nula
		booking.approved = true;

		await booking.save();

		const bookingUserSocket = req.connectedUsers[booking.user];

		if (bookingUserSocket) {
			req.io.to(bookingUserSocket).emit('booking_response', booking);
		}

		return res.json(booking);
	}
};
