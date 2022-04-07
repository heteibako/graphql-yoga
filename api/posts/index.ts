import { useQuery } from "react-query";
import { fetchAPI } from "@lib/base";

interface Post {
  id: string;
  title: string;
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const data = await fetchAPI(/* GraphQL */ `
    {
      posts {
        id
        title
        content
      }
    }
  `);
  return data.posts;
}

export const usePosts = () => {
  return useQuery(["posts"], getAllPosts);
};
