import { OuterPadding } from '../lib/constants';

export function Main(props) {
  return <div style={{ flex: 1, padding: OuterPadding }}>{props.children}</div>;
}
