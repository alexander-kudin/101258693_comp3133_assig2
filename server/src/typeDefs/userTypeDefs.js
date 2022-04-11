import { gql } from "apollo-server-express";

export const userTypeDefs = gql`

  type Mutation {
    createUser(userInput: UserInput!): User
    loginUser(loginInput: LoginInput!): AuthData
  }

  type AuthData {
    user: User
    token: String
  }

  type User {
    id: ID
    username: String
    firstname: String
    lastname: String
    password: String
    email: String
    type: String
  }

  input UserInput {
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

`;