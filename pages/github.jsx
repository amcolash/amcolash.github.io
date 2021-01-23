import GitHubCalendar from 'react-github-calendar';
import { Frown, GitBranch } from 'react-feather';
import useSWR from 'swr';

import { Colors, OuterPadding } from '../lib/constants';
import useDarkMode from 'use-dark-mode';

function Repo(props) {
  return (
    <div style={{ marginBottom: `calc(${OuterPadding} / 1.25)` }} key={props.data.id}>
      <div style={{ display: 'flex' }}>
        <a href={props.data.html_url}>{props.data.name}</a>
        {props.data.fork && <GitBranch alt="fork" style={{ marginLeft: 8 }} />}
        <span style={{ marginLeft: 8 }}>(Last Push: {new Date(props.data.pushed_at).toLocaleString()})</span>
      </div>
      <div>{props.data.description}</div>
    </div>
  );
}

function Repos({ page }) {
  const { data, error } = useSWR(`https://api.github.com/users/amcolash/repos?sort=pushed&per_page=100&page=${page}`);

  if (error)
    return page === 1 ? (
      <div style={{ display: 'flex' }}>
        Looks like we can't access the Github API right now <Frown style={{ marginLeft: 10 }} />
      </div>
    ) : null;
  if (!data) return page === 1 ? <div>Loading...</div> : null;

  return data.map((r) => <Repo data={r} />);
}

function RepoHeader() {
  const { data } = useSWR(`https://api.github.com/users/amcolash`);
  return <h3>My Repositories ({data && data.public_repos})</h3>;
}

export default function Github() {
  const darkMode = useDarkMode();

  return (
    <div>
      <h3>My Contributions</h3>
      <GitHubCalendar
        username="amcolash"
        theme={{ text: darkMode.value ? Colors.White : Colors.Black, grade0: darkMode.value ? '#555' : '#ddd' }}
        style={{ marginBottom: 40 }}
      />

      {/* Get all repositories. Since I am not at 200 total yet, this will be more than sufficient for now */}
      <RepoHeader />
      <Repos page={1} />
      <Repos page={2} />
    </div>
  );
}
