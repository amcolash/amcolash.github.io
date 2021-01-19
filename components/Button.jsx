import { cssRule, style } from 'typestyle';
import { Colors } from '../lib/constants';

cssRule('.dark-mode .button a, .light-mode .button a', {
  color: Colors.Black,
});

const button = style({
  background: Colors.White,
  border: `2px solid ${Colors.Black}`,
  padding: '0.35rem',
  borderRadius: '0.35rem',
  cursor: 'pointer',

  $nest: {
    '&:hover': {
      background: `${Colors.Green}`,
    },
  },
});

export function Button(props) {
  return <button className={'button ' + button} {...props} />;
}
