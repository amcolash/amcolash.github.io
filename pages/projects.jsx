import { getAllPosts } from '../lib/api';

export default function Projects({ allPosts }) {
  return <div>{JSON.stringify(allPosts)}</div>;
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
}
