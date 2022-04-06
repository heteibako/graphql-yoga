import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

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
    posts: [Post]
  }
  type Mutation {
    registerUser(email: String!, password: String!, name: String!): User!
    deleteUser(id: ID!): String
  }
`;

export const userResolvers = {
  Query: {
    users: async () =>
      await prisma.user.findMany({
        include: {
          posts: {
            select: {
              id: true,
              title: true,
              content: true,
            },
          },
        },
      }),
    user: async (_: unknown, args: { id: string }) => {
      var result = await prisma.user.findUnique({ where: { id: args.id } });
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
      const salt = await bcrypt.genSalt(10);
      const user = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: await bcrypt.hash(args.password, salt),
        },
      });
      return user;
    },
    deleteUser: async (_: unknown, args: { id: string }) => {
      await prisma.user.delete({ where: { id: args.id } });
      return "User deleted";
    },
  },
};
