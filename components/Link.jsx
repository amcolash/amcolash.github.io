import NextLink from 'next/link';
import { cssRule, style } from 'typestyle';
import useDarkMode from 'use-dark-mode';
import { Colors, interactiveStyle } from '../lib/constants';

cssRule('a:hover', {
  color: Colors.Green,
});

const buttonLinkClass = style({ ...interactiveStyle });

export function Link(props) {
  const darkMode = useDarkMode();

  const linkClass = style({
    textShadow: `1px 1px 1px ${darkMode.value ? Colors.Black : Colors.White}`,
    color: darkMode.value ? Colors.White : Colors.Black,
  });

  return props.external ? (
    <a
      className={`link ${buttonLinkClass} abutton`}
      style={{ ...props.style, display: 'flex', color: Colors.Black }}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </a>
  ) : (
    <NextLink href={props.href}>
      <a className={linkClass} style={{ ...props.style }}>
        {props.children}
      </a>
    </NextLink>
  );
}
