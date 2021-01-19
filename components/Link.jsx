import NextLink from 'next/link';
import { cssRule } from 'typestyle';
import { Colors } from '../lib/constants';

cssRule('.link:hover', {
  background: Colors.Green,
});

cssRule('.dark-mode a', {
  textShadow: `1px 1px 1px ${Colors.Black}`,
  color: Colors.White,
});

cssRule('.light-mode a', {
  textShadow: `1px 1px 1px ${Colors.White}`,
  color: Colors.Black,
});

export function Link(props) {
  return (
    <div className="link" style={{ padding: '0.25rem', borderRadius: 3 }}>
      <NextLink {...props} />
    </div>
  );
}
