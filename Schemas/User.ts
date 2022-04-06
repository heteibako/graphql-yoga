import { User } from "../models/User";

export const userTypeDefs = /* GraphQL */ `
  type Query {
    user(id: ID!): User
    users: [User]
  }
  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
  }
  type Mutation {
    registerUser(email: String!, password: String!, name: String!): User!
    deleteUser(id: ID!): String
  }
`;

export const userResolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_: unknown, args: { id: string }) => {
      var result = await User.findById(args.id);
      return result;
    },
  },
  Mutation: {
    registerUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        password: string;
      }
    ) => {
      const user = await User.create(args);
      await user.save();
      return user;
    },
    deleteUser: async (_: unknown, args: { id: string }) => {
      await User.findByIdAndRemove(args.id);
      return "User deleted";
    },
  },
};
