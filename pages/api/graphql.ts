import { userTypeDefs, userResolvers } from "./../../Schemas/User";
import { postResolvers, postTypeDefs } from "./../../Schemas/Post";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/db";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  cors: false,
  endpoint: "/api/graphql",
  schema: {
    typeDefs: [postTypeDefs, userTypeDefs],
    resolvers: [postResolvers, userResolvers],
  },
});

// connectDB();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;
