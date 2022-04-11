import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        listing_id: { type: String, required: true },
        booking_date: { type: String, required: true },
        booking_start: { type: String, required: true },
        booking_end: { type: String, required: true },
        username: { type: String, required: true },
    },
);

const Booking = mongoose.model('booking', BookingSchema);

export default Booking;