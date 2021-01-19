import { GitHub, Linkedin } from 'react-feather';

import { Link } from '../components/Link';
import { OuterPadding } from '../lib/constants';
import { Button } from './Button';

export function Footer() {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
      <div style={{ flex: '1' }} />
      <Button style={{ marginRight: `calc(${OuterPadding} / 1.5)` }}>
        <a href="https://github.com/amcolash" target="_blank" style={{ display: 'flex' }}>
          <GitHub />
        </a>
      </Button>
      <Button style={{ marginRight: `calc(${OuterPadding} / 1.5)` }}>
        <a href="https://linkedin.com/in/andrew-mcolash" target="_blank" style={{ display: 'flex' }}>
          <Linkedin />
        </a>
      </Button>
      <Link href="mailto:amcolash@gmail.com">amcolash@gmail.com</Link>
    </footer>
  );
}
