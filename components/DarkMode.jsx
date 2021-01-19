import { Moon, Sun } from 'react-feather';
import useDarkMode from 'use-dark-mode';

import { OuterPadding } from '../lib/constants';
import { Button } from './Button';

export function DarkMode() {
  const darkMode = useDarkMode(false);

  return (
    <div className="darkMode">
      <Button style={{ display: 'flex', marginLeft: `calc(${OuterPadding} / 3)` }} onClick={darkMode.toggle}>
        {darkMode.value && <Sun />}
        {!darkMode.value && <Moon />}
      </Button>
    </div>
  );
}
