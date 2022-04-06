import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const postTypeDefs = /* GraphQL */ `
  type Query {
    post(id: ID!): Post
    posts: [Post]
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    imagePath: String
  }
  type Mutation {
    addPost(title: String!, content: String!): Post!
    deletePost(id: ID!): String
  }
`;

export const postResolvers = {
  Query: {
    posts: async () => await prisma.posts.findMany(),
    post: async (_: unknown, args: { id: string }) => {
      var result = await prisma.posts.findUnique({ where: { id: args.id } });
      return result;
    },
  },
  Mutation: {
    addPost: async (
      _: unknown,
      args: {
        title: string;
        content: string;
        imagePath?: string;
      }
    ) => {
      const post = await prisma.posts.create({
        data: {
          title: args.title,
          content: args.content,
          imagePath: args.imagePath || "",
        },
      });
      return post;
    },
    deletePost: async (_: unknown, args: { id: string }) => {
      await prisma.posts.delete({ where: { id: args.id } });
      return "User deleted";
    },
  },
};
