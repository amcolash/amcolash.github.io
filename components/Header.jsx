import { cssRule } from 'typestyle';
import { OuterPadding } from '../lib/constants';
import { DarkMode } from './DarkMode';

import { Link } from './Link';

cssRule('header .link', {
  marginRight: `calc(${OuterPadding} / 2)`,
});

export function Header() {
  return (
    <header style={{ width: '100%' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
        <Link href="/">
          <a style={{ fontSize: '1.75rem', marginRight: 0 }}>Andrew McOlash</a>
        </Link>
        <div style={{ flex: 1 }} />

        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/github">Github</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/resume">Resume</Link>

        <DarkMode />
      </nav>
    </header>
  );
}
