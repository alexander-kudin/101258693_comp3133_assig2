import Listing from '../models/Listing.js' // Mongoose Listing Model

export const listingResolver = {
    Query: {
        getUserListings: async (parent, args, context) => {
            // Auth Check
            // if (!context.isAuth) { throw new Error('Unauthenticated!') }

            // Access Level Check
            // if (context.userAuth.type !== 'admin') { throw new Error('You do not have admin permission!') }

            // Destruct unput arguments
            // const { username } = context.userAuth
            const { username } = args

            // Find and return Listing List
            return await Listing.find({ username: username })
        },

        getListings: async (parent, args, context) => {
            // Find and return Listing List
            return await Listing.find()
        },

        getListingsByTitle: async (parent, args, context) => {
            // Destruct unput arguments
            const { title } = args

            // Find and return Listing List
            return await Listing.find({ listing_title: title })
        },

        getListingsByCity: async (parent, args, context) => {
            // Destruct unput arguments
            const { city } = args

            // Find and return Listing List
            return await Listing.find({ city: city })
        },

        getListingsByPostalCode: async (parent, args, context) => {
            // Destruct unput arguments
            const { postalCode } = args

            // Find and return Listing List
            return await Listing.find({ postal_code: postalCode })
        },
    },

    Mutation: {
        createListing: async (parent, args, context, info) => {
            // Auth Check
            // if (!context.isAuth) { throw new Error('Unauthenticated!') }

            // Access Level Check
            // if (context.userAuth.type !== 'admin') { throw new Error('You do not have admin permission!') }

            // Destruct input arguments
            const { listing_title, description, street, city, postal_code, price, email, username } = args.listingInput
            // const { username } = context.userAuth

            // Build Mongoose Listing Model
            const listing = new Listing({ listing_title, description, street, city, postal_code, price, email, username });

            // Save Listing Model in MongoDB
            await listing.save();

            // Return saved Listing Model
            return listing;
        },
    }
};