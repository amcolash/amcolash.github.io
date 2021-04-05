import Tooltip from 'the-only-react-tooltip';
import { style } from 'typestyle';

import { interactiveStyle } from '../lib/constants';

const buttonClass = style(interactiveStyle);

export function Button(props) {
  const inner = <button className={'button ' + buttonClass} {...props} />;

  return props.title ? <Tooltip body={props.title}>{inner}</Tooltip> : inner;
}
