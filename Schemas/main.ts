import { commentTypeDefs, commentResolvers } from "./Comment";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { postResolvers, postTypeDefs } from "./Post";
import { userResolvers, userTypeDefs } from "./User";

const typeDefs = [postTypeDefs, userTypeDefs, commentTypeDefs];
const resolvers = [postResolvers, userResolvers, commentResolvers];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
