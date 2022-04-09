import "next-auth";
import { NextApiRequest } from "next";

declare module "next-auth" {
  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
  }
  interface Session {
    user: User;
  }
}
