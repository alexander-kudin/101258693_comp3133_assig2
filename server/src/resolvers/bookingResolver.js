import Booking from '../models/Booking.js' // Mongoose Booking Model

export const bookingResolver = {
  Query: {
    getUserBookings: async (parent, args, context, info) => {
      // Auth Check
      // if (!context.isAuth) { throw new Error('Unauthenticated!') }

      // Destruct unput arguments
      const { username } = args

      // Find and return Booking List
      return await Booking.find({ username })
    },
  },

  Mutation: {
    createBooking: async (parent, args, context, info) => {
      // Auth Check
      // if (!context.isAuth) { throw new Error('Unauthenticated!') }

      // Destruct input arguments
      const { listing_id, booking_date, booking_start, booking_end, username } = args.bookingInput
      // const { username } = context.userAuth

      // Build Mongoose Booking Model
      const booking = new Booking({ listing_id, booking_date, booking_start, booking_end, username });

      // Save Booking Model in MongoDB
      await booking.save();

      // Return saved Booking Model
      return booking;
    },
  }
};