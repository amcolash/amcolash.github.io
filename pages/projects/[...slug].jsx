import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';

import { Button } from '../../components/Button';
import { Media } from '../../components/Media';

import { getDataBySlug, getAllData, projectsDirectory } from '../../lib/api';
import { OuterPadding } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';

export default function Project({ project }) {
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => router.push('/projects')} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 'auto' }}>
        <ArrowLeftCircle style={{ marginRight: `calc(${OuterPadding} / 2)` }} />
        Back to Projects
      </Button>

      <div className="project" style={{ width: '100%', maxWidth: 960, overflow: 'hidden' }}>
        <Head>
          <title>{project.title}</title>
        </Head>

        <h1>{project.title}</h1>

        {project.links && (
          <div style={{ disply: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
            {project.links.map((l) => (
              <div key={l.url}>
                <a href={l.url}>{l.title}</a>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Media images={project.images} video={project.video} />
          {router.isFallback ? (
            'Loading…'
          ) : (
            <div style={{ marginTop: '1rem', minWidth: '20rem' }} dangerouslySetInnerHTML={{ __html: project.content }} />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const project = getDataBySlug(params.slug, projectsDirectory, ['title', 'slug', 'content', 'links', 'images', 'video']);
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
