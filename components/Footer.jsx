import { GitHub, Linkedin, Mail } from 'react-feather';
import { cssRule } from 'typestyle';

import { Link } from '../components/Link';
import { OuterPadding } from '../lib/constants';

cssRule('@media print', {
  footer: { display: 'none !important' },
});

export function Footer() {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
      <div style={{ flex: '1' }} />
      <Link
        button
        external
        title="Github"
        href="https://github.com/amcolash"
        target="_blank"
        style={{ marginRight: `calc(${OuterPadding} / 2)` }}
      >
        <GitHub />
      </Link>
      <Link
        button
        external
        title="LinkedIn"
        href="https://linkedin.com/in/andrew-mcolash"
        target="_blank"
        style={{ marginRight: `calc(${OuterPadding} / 2)` }}
      >
        <Linkedin />
      </Link>
      <Link button external title="Email" href="mailto:amcolash@gmail.com">
        <Mail />
      </Link>
    </footer>
  );
}
