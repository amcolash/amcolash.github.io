import { Fragment } from 'react';
import { style } from 'typestyle';
import { Link } from '../components/Link';

import { getAllData, projectsDirectory } from '../lib/api';
import { OuterPadding } from '../lib/constants';

const sortMap = {
  'Personal and School Projects (2014-Present)': 1,
  'Liberty Mutual (2014)': 2,
  'UW SHOW (2014-2015)': 3,
  'Perblue (2015-2018)': 4,
};

const project = style({
  marginBottom: `calc(${OuterPadding} / 1.75)`,
  width: '16rem',
  height: '9rem',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export default function Projects({ allProjects }) {
  let lastSection = '';
  let first = true;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 960 }}>
        {allProjects
          .sort((a, b) => {
            const aSort = sortMap[a.section];
            const bSort = sortMap[b.section];
            return bSort - aSort;
          })
          .map((p) => {
            let header;

            if (lastSection != p.section) {
              header = (
                <>
                  <div style={{ flex: '100%' }} />
                  <h2 style={{ marginTop: first ? 0 : 32, marginBottom: 0 }}>{p.section}</h2>
                  <div style={{ flex: '100%' }} />
                </>
              );
              lastSection = p.section;
            }

            first = false;

            return (
              <Fragment key={p.slug}>
                {header}
                <div style={{ textAlign: 'center' }}>
                  <Link href={'/projects/' + p.slug} style={{ display: 'block', margin: '1.5rem', marginTop: '1rem' }}>
                    <div className={project} style={{ backgroundImage: `url('${p.thumbnail}')` }} />
                    {p.title}
                  </Link>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allProjects = getAllData(['title', 'date', 'slug', 'section', 'thumbnail'], projectsDirectory);

  return {
    props: { allProjects },
  };
}
