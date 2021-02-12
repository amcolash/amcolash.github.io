import ReactPlayer from 'react-player';
import { cssRule } from 'typestyle';

cssRule('.mediaImg', {
  maxHeight: '25rem',
  maxWidth: '25rem',
  margin: '1rem',
  overflow: 'hidden',

  $nest: {
    img: {
      maxWidth: '100%',
      maxHeight: '100%',
    },

    'img.square': {
      maxWidth: '150%',
      maxHeight: '150%',
    },
  },
});

export function Media(props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {props.images &&
        props.images.map((i) => (
          <div key={i.url || i} className="mediaImg">
            <a href={i.url || i} target="_blank">
              <img src={i.url || i} alt={i.alt} className={props.square ? 'square' : ''} />
            </a>
          </div>
        ))}
      {props.video && (
        <div>
          <ReactPlayer width="100%" style={{ maxWidth: '25rem' }} url={`https://www.youtube.com/watch?v=${props.video}`} />
        </div>
      )}
    </div>
  );
}
