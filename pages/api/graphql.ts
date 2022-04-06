// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../Schemas";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  cors: false,
  endpoint: "/api/graphql",
  schema,
});

// connectDB();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;
