import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        const isPasswordMatch = async () =>
          await bcrypt.compare(
            credentials?.password ?? "",
            user?.password ?? ""
          );

        const passwordMatch = await isPasswordMatch();

        const getSignedJwtToken = async () =>
          jwt.sign({ id: user?.id }, process.env.JWT_SECRET as jwt.Secret, {
            expiresIn: process.env.JWT_EXPIRE,
          });

        const token = await getSignedJwtToken();
        console.log(token, "token");
        console.log(passwordMatch, "match");
        console.log(user, "user");
        if (user && passwordMatch) {
          return { user, token };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    // signingKey: process.env.JWT_SIGNING_KEY,
    // encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    // encryption: true,
    // verificationOptions: {
    //     algorithms: ['HS256'],
    // },
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token = user);
      return token; // ...here
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      const sess: SessProps = {
        user: {
          id: token.user.id as unknown as string,
          email: token.user.email,
          name: token.user.name,
          expires: token.exp,
        },
        token: token.token,
      };

      session = sess;
      return session;
    },
  },
});

interface SessProps {
  user: UserProps;
  token: string;
}

interface UserProps {
  id: unknown;
  email: string;
  name: string;
  expires: unknown;
}
