import { useRouter } from 'next/router';
import { OuterPadding } from '../lib/constants';

export function Main(props) {
  const router = useRouter();
  const showTitle = router.pathname !== '/' && router.pathname.indexOf('/posts') === -1;

  return (
    <div className="main" style={{ flex: 1, padding: OuterPadding }}>
      {showTitle && (
        <h1 style={{ textTransform: 'capitalize', marginTop: '-1rem', marginBottom: '3rem' }}>{router.route.replace('/', '')}</h1>
      )}
      {props.children}
    </div>
  );
}
