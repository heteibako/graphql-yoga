import { fetchAPI } from "@lib/base";
import { useMutation } from "react-query";

interface User {
  email: string;
  password: string;
  name: string;
}

const registerUser = async (user: User) => {
  const data = await fetchAPI(/* GraphQL */ `
        mutation {
            registerUser(email: "${user.email}", password: "${user.password}", name: "${user.name}") {
                id
            }
        }
    `);
  return data.registerUser;
};

export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: () => {
      console.log("User created");
    },
  });
};
