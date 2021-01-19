import { GitHub, Linkedin } from 'react-feather';

import { OuterPadding } from '../lib/constants';

export function Footer() {
  return (
    <footer style={{ display: 'flex', padding: OuterPadding }}>
      <div style={{ flex: '1' }} />
      <a href="https://github.com/amcolash" style={{ paddingRight: OuterPadding }}>
        <GitHub />
      </a>
      <a href="https://linkedin.com/in/andrew-mcolash" style={{ paddingRight: OuterPadding }}>
        <Linkedin />
      </a>
      <a href="mailto:amcolash@gmail.com">amcolash@gmail.com</a>
    </footer>
  );
}
