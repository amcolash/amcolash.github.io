import { Fragment } from 'react';
import { Link } from '../components/Link';

import { getAllData, projectsDirectory } from '../lib/api';
import { OuterPadding } from '../lib/constants';

export default function Projects({ allProjects }) {
  let lastYear = 9999;

  return allProjects.map((p) => {
    let header;
    const year = new Date(p.date).getFullYear();
    if (lastYear > year) {
      header = <h2>{year}</h2>;
      lastYear = year;
    }

    return (
      <Fragment key={p.slug}>
        {header}
        <div style={{ marginBottom: `calc(${OuterPadding} / 1.75)` }}>
          <Link href={'/posts/' + p.slug}>{p.title}</Link>
          <br />
          <span style={{ fontSize: 16 }}>{new Date(p.date).toLocaleString()}</span>
        </div>
      </Fragment>
    );
  });
}

export async function getStaticProps() {
  const allProjects = getAllData(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'], projectsDirectory);

  return {
    props: { allProjects },
  };
}
