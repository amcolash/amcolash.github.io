import { style } from 'typestyle';

const footer = style({ padding: '1rem' });

export function Footer() {
  return <footer className={footer}>This is my footer</footer>;
}
