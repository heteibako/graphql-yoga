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
    userId: String!
    user: User
  }
  type Mutation {
    addPost(title: String!, content: String!, userId: String!): Post!
    deletePost(id: ID!): String
  }
`;

prisma.$use(async (params, next) => {
  console.log(params);

  if (params.model == "Post" && params.action == "create") {
    // Logic only runs for delete action and Post model
    console.log("Post created");
  }
  return next(params);
});

export const postResolvers = {
  Query: {
    posts: async () =>
      await prisma.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    post: async (_: unknown, args: { id: string }) => {
      var result = await prisma.post.findUnique({ where: { id: args.id } });
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
        userId: string;
      }
    ) => {
      const post = await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          imagePath: args.imagePath || "",
          user: {
            connect: {
              id: args.userId,
            },
          },
        },
      });
      return post;
    },
    deletePost: async (_: unknown, args: { id: string }) => {
      await prisma.post.delete({ where: { id: args.id } });
      return "User deleted";
    },
  },
};
