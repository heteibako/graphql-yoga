// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@schemas/index";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  cors: false,
  endpoint: "/api/graphql",
  schema,
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;
