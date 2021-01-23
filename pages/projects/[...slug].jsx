import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';

import { getDataBySlug, getAllData, projectsDirectory, getAllData } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

import { Button } from '../../components/Button';
import { OuterPadding } from '../../lib/constants';

export default function Project({ project }) {
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>

      <Button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <ArrowLeftCircle style={{ marginRight: 10 }} />
        Back to Blog
      </Button>

      <h1>{project.title}</h1>
      <h4 style={{ marginBottom: `calc(${OuterPadding} * 3)` }}>{new Date(project.date).toLocaleString()}</h4>
      {router.isFallback ? 'Loading…' : <div dangerouslySetInnerHTML={{ __html: project.content }} />}
    </>
  );
}

export async function getStaticProps({ params }) {
  const project = getDataBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'], projectsDirectory);
  const content = await markdownToHtml(project.content || '');

  return {
    props: {
      project: {
        ...project,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = await getAllData(['slug'], projectsDirectory);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug.split('/'),
        },
      };
    }),
    fallback: false,
  };
}
