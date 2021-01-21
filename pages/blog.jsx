import { Link } from '../components/Link';

import { getAllPosts } from '../lib/api';

export default function Blog({ allPosts }) {
  return (
    <>
      <h1>Blog</h1>

      {allPosts.map((p) => {
        return (
          <div>
            <Link href={'/posts/' + p.slug}>{p.title}</Link>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
}
