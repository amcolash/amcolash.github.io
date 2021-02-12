import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';
import ReactPlayer from 'react-player/youtube';

import { getDataBySlug, getAllData, projectsDirectory } from '../../lib/api';
import { OuterPadding } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';

import { Button } from '../../components/Button';

export default function Project({ project }) {
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 'auto' }}>
        <ArrowLeftCircle style={{ marginRight: `calc(${OuterPadding} / 2)` }} />
        Back to Projects
      </Button>

      <div style={{ width: '100%', maxWidth: 960 }}>
        <Head>
          <title>{project.title}</title>
        </Head>

        <h1>{project.title}</h1>

        {project.links && (
          <div style={{ disply: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
            {project.links.map((l) => (
              <div>
                <a href={l.url}>{l.title}</a>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex' }}>
            {project.images &&
              project.images.map((i) => (
                <div>
                  <a href={i} target="_blank">
                    <img src={i} style={{ maxHeight: '30rem', maxWidth: '30rem', margin: '1rem' }} />
                  </a>
                </div>
              ))}
            <div>
              {project.video && <ReactPlayer width="100%" height="16.8rem" url={`https://www.youtube.com/watch?v=${project.video}`} />}
            </div>
          </div>
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
