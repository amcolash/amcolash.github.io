import { style } from 'typestyle';

import { interactiveStyle } from '../lib/constants';

const buttonClass = style(interactiveStyle);

export function Button(props) {
  return <button className={'button ' + buttonClass} {...props} />;
}
