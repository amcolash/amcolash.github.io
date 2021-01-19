import { GitHub, Linkedin } from 'react-feather';

import { OuterPadding } from '../lib/constants';

export function Footer() {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
      <div style={{ flex: '1' }} />
      <button style={{ marginRight: `calc(${OuterPadding} / 1.5)` }}>
        <a href="https://github.com/amcolash" target="_blank" style={{ display: 'flex' }}>
          <GitHub />
        </a>
      </button>
      <button style={{ marginRight: `calc(${OuterPadding} / 1.5)` }}>
        <a href="https://linkedin.com/in/andrew-mcolash" style={{ display: 'flex' }}>
          <Linkedin />
        </a>
      </button>
      <a href="mailto:amcolash@gmail.com">amcolash@gmail.com</a>
    </footer>
  );
}
