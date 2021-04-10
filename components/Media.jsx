import { lazy, Suspense, useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import { cssRule } from 'typestyle';

const ReactPlayer = lazy(() => import('react-player/youtube'));

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
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },

    'img.square': {
      maxWidth: '150%',
      maxHeight: '150%',
      objectFit: 'cover',
    },
  },
});

export function Media(props) {
  const [visible, setVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {props.video && (
        <div
          style={{
            display: 'flex',
            flex: '0 0 100%',
            margin: '1rem',
            position: 'relative',
            paddingTop: '56.25%',
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ReactPlayer
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={`https://www.youtube.com/watch?v=${props.video}`}
            />
          </Suspense>
        </div>
      )}
      {props.images && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {props.images.map((i, index) => (
              <div className="mediaImg" key={i.url || i} tabIndex="0">
                <img
                  src={i.url || i}
                  alt={i.alt}
                  onClick={() => {
                    setStartIndex(index);
                    setVisible(true);
                  }}
                  className={props.square ? 'square' : ''}
                />
              </div>
            ))}
          </div>
          {visible && (
            <Lightbox
              images={props.images.map((i) => {
                return { url: i.url || i, title: i.alt };
              })}
              startIndex={startIndex}
              onClose={() => setVisible(false)}
              allowZoom={false}
              allowRotate={false}
              allowReset={false}
            />
          )}
        </>
      )}
    </div>
  );
}
