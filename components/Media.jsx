import ReactPlayer from 'react-player';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
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
        <div
          style={{
            display: 'flex',
            flex: '0 0 100%',
            margin: '1rem',
            position: 'relative',
            paddingTop: '56.25%',
          }}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            url={`https://www.youtube.com/watch?v=${props.video}`}
          />
        </div>
      )}
      {props.images && (
        <SimpleReactLightbox>
          <SRLWrapper
            options={{
              buttons: {
                showAutoplayButton: false,
                showDownloadButton: false,
                showFullscreenButton: false,
                showThumbnailsButton: false,
              },
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {props.images.map((i) => (
                <a href={i.url || i} className="mediaImg" key={i.url || i}>
                  <img src={i.url || i} alt={i.alt} className={props.square ? 'square' : ''} />
                </a>
              ))}
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
      )}
    </div>
  );
}
