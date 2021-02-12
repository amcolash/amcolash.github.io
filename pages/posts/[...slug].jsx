import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';

import { getDataBySlug, getAllData, postsDirectory } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

import { Button } from '../../components/Button';
import { OuterPadding } from '../../lib/constants';

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 'auto' }}>
        <ArrowLeftCircle style={{ marginRight: `calc(${OuterPadding} / 2)` }} />
        Back to Blog
      </Button>

      <div style={{ width: '100%', maxWidth: 960 }}>
        <Head>
          <title>{post.title}</title>
        </Head>

        <h1 style={{ marginBottom: `calc(${OuterPadding} / 2)` }}>{post.title}</h1>
        <h4 style={{ marginTop: 0, marginBottom: `calc(${OuterPadding} * 2)` }}>{new Date(post.date).toLocaleString()}</h4>
        {router.isFallback ? 'Loading…' : <div dangerouslySetInnerHTML={{ __html: post.content }} />}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getDataBySlug(params.slug, postsDirectory, ['title', 'date', 'slug', 'content']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllData(['slug'], postsDirectory);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split('/'),
        },
      };
    }),
    fallback: false,
  };
}
