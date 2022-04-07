import type { NextPage } from "next";
import Head from "next/head";
import { usePosts } from "../api/posts";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data?.map((post) => (
          <div className={styles.post} key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
