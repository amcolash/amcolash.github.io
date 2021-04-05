import NextLink from 'next/link';
import Tooltip from 'the-only-react-tooltip';
import { cssRule, style } from 'typestyle';

import { Colors, interactiveStyle } from '../lib/constants';

cssRule('.dark-mode a', {
  textShadow: `1px 1px 1px ${Colors.Black}`,
  color: Colors.White,
});

cssRule('.light-mode a, .dark-mode .resume a', {
  textShadow: `1px 1px 1px ${Colors.White}`,
  color: Colors.Black,
});

cssRule('.dark-mode a:hover, .light-mode a:hover', {
  color: Colors.Green,
});

const buttonLinkClass = style({ ...interactiveStyle });

export function Link(props) {
  const inner = props.external ? (
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
      <a style={{ ...props.style }}>{props.children}</a>
    </NextLink>
  );

  return props.title ? <Tooltip body={props.title}>{inner}</Tooltip> : inner;
}
