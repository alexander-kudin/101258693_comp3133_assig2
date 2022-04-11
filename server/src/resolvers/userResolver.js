import User from '../models/User.js' // Mongoose User Model
import jwt from 'jsonwebtoken' // JWT Module
import { ApolloError } from 'apollo-server-express';

export const userResolver = {
  Mutation: {
    createUser: async (parent, args, context, info) => {
      // Destruct input arguments
      const { username, firstname, lastname, password, email, type } = args.userInput

      // Build Mongoose User Model
      const user = new User({ username, firstname, lastname, password, email, type });

      // Save User Model in MongoDB
      await user.save();

      // Return saved User Model
      return user;
    },

    loginUser: async (parent, args, context, info) => {
      // Destruct input arguments
      const { username, password } = args.loginInput

      // Check User exist
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new ApolloError('User does not exist.')
      }


      // Check password is correct
      const isEqual = password === user.password;
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }

      // Generate JWT
      const token = jwt.sign(
        { user_id: user._id, username: username,  type: user.type},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Return authenticated User Model & JWT
      return { user: user, token: token}

    },

    
  }
};