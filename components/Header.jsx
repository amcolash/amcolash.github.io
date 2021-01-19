import Link from 'next/link';
import { cssRule } from 'typestyle';
import { OuterPadding } from '../lib/constants';
import { DarkMode } from './DarkMode';

cssRule('header a', {
  paddingLeft: `calc(${OuterPadding} / 2)`,
});

export function Header() {
  return (
    <header style={{ width: '100%' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
        <Link href="/">
          <a style={{ fontSize: '1.75rem', paddingLeft: 0 }}>Andrew McOlash</a>
        </Link>
        <div style={{ flex: 1 }} />

        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/github">
          <a>Github</a>
        </Link>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
        <Link href="/resume">
          <a>Resume</a>
        </Link>

        <DarkMode />
      </nav>
    </header>
  );
}
