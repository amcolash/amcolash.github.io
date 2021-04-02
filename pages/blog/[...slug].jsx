import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';

import { Button } from '../../components/Button';
import { Media } from '../../components/Media';

import { getDataBySlug, getAllData, postsDirectory } from '../../lib/api';
import { OuterPadding } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => router.push('/blog')} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 'auto' }}>
        <ArrowLeftCircle style={{ marginRight: `calc(${OuterPadding} / 2)` }} />
        Back to Blog
      </Button>

      <div className="post" style={{ width: '100%', maxWidth: 960, overflow: 'hidden' }}>
        <Head>
          <title>{post.title}</title>
        </Head>

        <h1 style={{ marginBottom: `calc(${OuterPadding} / 2)` }}>{post.title}</h1>
        <h4 style={{ marginTop: 0, marginBottom: `calc(${OuterPadding} * 2)` }}>{new Date(post.date).toLocaleDateString()}</h4>
        {router.isFallback ? 'Loading…' : <div dangerouslySetInnerHTML={{ __html: post.content }} />}
        <Media images={post.images} video={post.video} square />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getDataBySlug(params.slug, postsDirectory, ['title', 'date', 'slug', 'content', 'images', 'video']);
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
