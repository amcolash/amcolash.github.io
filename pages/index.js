import { getAllPosts } from '../lib/api';
import Head from 'next/head';

export default function Index({ allPosts }) {
  return (
    <>
      <Head>
        <title>Next.js Blog Example</title>
      </Head>
      {JSON.stringify(allPosts)}
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
}
