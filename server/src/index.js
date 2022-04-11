// Private Variables (PORT & MONGO_CONNECTION_URL)
import 'dotenv/config'

// Apollo Server
import { ApolloServer } from "apollo-server-express";

// Express Server
import express from "express";

// Mongoose for MongoDB
import mongoose from "mongoose";

// Apollo Server Congigurations
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import { authConfigs } from "./authConfigs.js";

// Server Congiguration Variables
const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

// Configure and run server
const startServer = async () => {

    // Express Server Instance
    const app = express();

    // Apollo Server Instance
    const apolloServer = new ApolloServer({
        typeDefs, 
        resolvers,
        context: ({ req }) => { return authConfigs(req) }
    });

    // Run Apollo Server Instance
    await apolloServer.start();

    // Insert Apollo Server to Express Server as middleware
    apolloServer.applyMiddleware({ app });

    // Connect Mongoose to MongoDB Cluster
    await mongoose.connect(MONGO_CONNECTION_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log(`🚀 Mongoose is connected.`)

    // Run Express Server Instance
    app.listen(PORT, () =>
        console.log(`🚀 Server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    );
};

startServer();