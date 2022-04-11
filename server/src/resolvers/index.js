import GMR from '@wiicamp/graphql-merge-resolvers'; // Resolver Merge Package

// Import Resolvers
import { userResolver } from "./userResolver.js";
import { listingResolver } from "./listingResolver.js";
import { bookingResolver } from "./bookingResolver.js";

// Merge Resolvers
const resolvers = GMR.merge([
  userResolver,
  listingResolver,
  bookingResolver
]);

export default resolvers