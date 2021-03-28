import { Moon, Sun } from 'react-feather';
import useDarkMode from 'use-dark-mode';

import { Button } from './Button';

export function DarkMode(props) {
  const darkMode = useDarkMode(true);

  return (
    <div className="darkMode" style={{ ...props.style }}>
      <Button style={{ display: 'flex' }} onClick={darkMode.toggle}>
        {darkMode.value && <Sun />}
        {!darkMode.value && <Moon />}
      </Button>
    </div>
  );
}
