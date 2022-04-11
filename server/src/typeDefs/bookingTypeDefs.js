import { gql } from "apollo-server-express";

export const bookingTypeDefs = gql`

  type Query {
    getUserBookings(username: String!): [Booking]
  }

  type Mutation {
    createBooking(bookingInput: BookingInput): Booking
  }

  type Booking {
    id: ID
    listing_id: ID
    booking_date: String
    booking_start: String
    booking_end: String
    username: String
  }

  input BookingInput {
    listing_id: ID!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

`;

