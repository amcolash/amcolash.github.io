import { useRouter } from 'next/router';
import { cssRule } from 'typestyle';
import useDarkMode from 'use-dark-mode';

import { DarkMode } from './DarkMode';
import { Link } from './Link';
import { NavMenu } from './NavMenu';

import { Colors, OuterPadding } from '../lib/constants';

cssRule('@media print', {
  header: { display: 'none' },
});

export function Header() {
  const router = useRouter();
  const darkMode = useDarkMode();

  return (
    <header style={{ width: '100%' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: OuterPadding }}>
        {/* Show text on the main page and a link back to home on other pages */}
        {router.pathname === '/' ? (
          <div style={{ fontSize: '1.75rem', textShadow: `1px 1px 1px ${darkMode.value ? Colors.Black : Colors.White}` }}>
            Andrew McOlash
          </div>
        ) : (
          <Link href="/" style={{ fontSize: '1.75rem' }}>
            Andrew McOlash
          </Link>
        )}
        <div style={{ flex: 1 }} />
        <DarkMode style={{ marginRight: `calc(${OuterPadding} / 2)` }} />
        <NavMenu />
      </nav>
    </header>
  );
}
