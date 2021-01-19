import { Moon, Sun } from 'react-feather';
import useDarkMode from 'use-dark-mode';

import { Colors, OuterPadding } from '../lib/constants';

export function DarkMode() {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          background: darkMode.value ? Colors.White : Colors.Black,
          color: darkMode.value ? Colors.Black : Colors.White,
          marginLeft: `calc(${OuterPadding} / 1.25)`,
          border: 'none',
          padding: '0.35rem',
          borderRadius: '0.25rem',
        }}
        onClick={darkMode.toggle}
      >
        {darkMode.value && <Sun />}
        {!darkMode.value && <Moon />}
      </button>
    </div>
  );
}
