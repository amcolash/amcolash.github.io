import useDarkMode from 'use-dark-mode';
import React from 'react';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import { Menu as Burger } from 'react-feather';
import { cssRule, style } from 'typestyle';

import { Colors, interactiveStyle, OuterPadding } from '../lib/constants';
import { Link } from './Link';

const menuButtonClass = style(interactiveStyle);

cssRule('.MyMenuButton-menu li', {
  margin: '10px 3px',
});

export const NavMenu = () => {
  const darkMode = useDarkMode();

  return (
    <Wrapper className="MyMenuButton" style={{ position: 'relative' }}>
      <Button className={`MyMenuButton-button ${menuButtonClass}`} style={{ display: 'flex', color: Colors.Black }}>
        <Burger />
      </Button>
      <Menu
        className="MyMenuButton-menu"
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          zIndex: 99,
          textAlign: 'center',
          background: darkMode.value ? Colors.Black : Colors.White,
          padding: `calc(${OuterPadding} / 2)`,
          border: `1px solid ${darkMode.value ? Colors.White : Colors.Black}`,
        }}
        tabIndex=""
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/github">Github</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
        </ul>
      </Menu>
    </Wrapper>
  );
};
