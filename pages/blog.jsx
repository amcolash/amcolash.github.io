import { getAllPosts } from '../lib/api';

export default function Blog({ allPosts }) {
  return (
    <>
      <h1>Blog</h1>
      <div>{JSON.stringify(allPosts)}</div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
}
