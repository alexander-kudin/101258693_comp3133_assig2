import { mergeTypeDefs } from '@graphql-tools/merge'

// Import Type Defenitions
import { userTypeDefs } from "./userTypeDefs.js";
import { listingTypeDefs } from "./listingTypeDefs.js";
import { bookingTypeDefs } from "./bookingTypeDefs.js";

// Merge Type Defenitions
const types = mergeTypeDefs([userTypeDefs, listingTypeDefs, bookingTypeDefs]);

export default types