import { gql } from "apollo-server-express";

export const listingTypeDefs = gql`

  type Query {
    getUserListings(username: String!): [Listing]
    getListings: [Listing]
    getListingsByTitle(title: String!): [Listing]
    getListingsByCity(city: String!): [Listing]
    getListingsByPostalCode(postalCode: String!): [Listing]
  }

  type Mutation {
    createListing(listingInput: ListingInput!): Listing
  }

  type Listing {
    id: ID
    listing_title: String
    description: String
    street: String
    city: String
    postal_code: String
    price: String
    email: String
    username: String
  }

  input ListingInput {
    listing_title: String!
    description: String!
    street: String!
    city: String
    postal_code: String!
    price: String!
    email: String!
    username: String!
  }

`;