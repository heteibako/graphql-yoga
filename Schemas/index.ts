import { makeExecutableSchema } from "@graphql-tools/schema";
import { postResolvers, postTypeDefs } from "./Post";
import { userResolvers, userTypeDefs } from "./User";

const typeDefs = [postTypeDefs, userTypeDefs];
const resolvers = [postResolvers, userResolvers];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
