import ReactPlayer from 'react-player';
import { cssRule } from 'typestyle';

import { Colors } from '../lib/constants';

cssRule('.mediaImg', {
  display: 'block',
  maxHeight: '15rem',
  maxWidth: '15rem',
  margin: '1rem',
  overflow: 'hidden',
  transition: 'all 0.15s',

  $nest: {
    '&:hover, &:focus': {
      boxShadow: `0 0 1rem ${Colors.Green}`,
      outline: `0.35rem solid ${Colors.Green}`,
      outlineOffset: '-0.35rem',
    },

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
      {props.video && (
        <div style={{ display: 'flex', justifyContent: 'center', flex: '0 0 100%', margin: '1rem' }}>
          <ReactPlayer width="100%" style={{ maxWidth: '25rem' }} url={`https://www.youtube.com/watch?v=${props.video}`} />
        </div>
      )}
      {props.images &&
        props.images.map((i) => (
          <a href={i.url || i} target="_blank" className="mediaImg" key={i.url || i}>
            <img src={i.url || i} alt={i.alt} className={props.square ? 'square' : ''} />
          </a>
        ))}
    </div>
  );
}
