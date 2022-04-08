import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const commentTypeDefs = /* GraphQL */ `
  type Query {
    comment(id: ID!): Comment
    comments: [Comment]
  }
  type Comment {
    id: ID!
    content: String!
    userId: String!
    user: User
    post: Post
    postId: String!
  }
  type Mutation {
    addComment(content: String!, userId: String!, postId: String!): Comment!
    deleteComment(id: ID!): String
  }
`;

export const commentResolvers = {
  Query: {
    comments: async () =>
      await prisma.comment.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      }),
    comment: async (_: unknown, args: { id: string }) => {
      var result = await prisma.comment.findUnique({ where: { id: args.id } });
      return result;
    },
  },
  Mutation: {
    addComment: async (
      _: unknown,
      args: {
        content: string;
        userId: string;
        postId: string;
      }
    ) => {
      const post = await prisma.comment.create({
        data: {
          content: args.content,
          user: {
            connect: {
              id: args.userId,
            },
          },
          post: {
            connect: {
              id: args.postId,
            },
          },
        },
      });
      return post;
    },
    deleteComment: async (_: unknown, args: { id: string }) => {
      await prisma.comment.delete({ where: { id: args.id } });
      return "Comment deleted";
    },
  },
};
