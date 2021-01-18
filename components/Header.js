import Link from 'next/link';

function BlockLink(props) {
  return (
    <div style={{ padding: '0.25rem' }}>
      <Link {...props}>{props.children}</Link>
    </div>
  );
}

export function Header() {
  return (
    <header style={{ width: '100%' }}>
      <nav style={{ display: 'flex', padding: '1rem' }}>
        <BlockLink href="/">Andrew McOlash</BlockLink>
        <div style={{ flex: 1 }} />
        <BlockLink href="/about">About</BlockLink>
        <BlockLink href="/blog">Blog</BlockLink>
        <BlockLink href="/projects">Projects</BlockLink>
      </nav>
    </header>
  );
}
