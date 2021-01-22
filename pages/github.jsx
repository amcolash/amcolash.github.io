import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import { GitBranch } from 'react-feather';
import useSWR from 'swr';

import { Colors, OuterPadding } from '../lib/constants';
import useDarkMode from 'use-dark-mode';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Repos({ index: page }) {
  const { data } = useSWR(`https://api.github.com/users/amcolash/repos?sort=pushed&per_page=100&page=${page}`, fetcher);

  if (!data) return page === 1 ? <div>Loading...</div> : null;

  return data.map((r) => (
    <div style={{ marginBottom: `calc(${OuterPadding} / 1.25)` }} key={r.id}>
      <div style={{ display: 'flex' }}>
        <a href={r.html_url}>{r.name}</a>
        {r.fork && <GitBranch alt="fork" style={{ marginLeft: 8 }} />}
        <span style={{ marginLeft: 8 }}>(Last Push: {new Date(r.pushed_at).toLocaleString()})</span>
      </div>
      <div>{r.description}</div>
    </div>
  ));
}

export default function Github() {
  const darkMode = useDarkMode();

  return (
    <div>
      <h3>My Contributions</h3>
      <GitHubCalendar username="amcolash" theme={{ text: darkMode.value ? Colors.White : Colors.Black }} style={{ marginBottom: 40 }} />

      {/* Get all repositories. Since I am not at 200 total yet, this will be more than sufficient for now */}
      <h3>My Repositories</h3>
      <Repos page={1} />
      <Repos page={2} />
    </div>
  );
}
