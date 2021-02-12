import ReactPlayer from 'react-player';

export function Media(props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
      {props.images &&
        props.images.map((i) => (
          <div key={i.src || i}>
            <a href={i.src || i} target="_blank">
              <img src={i.src || i} alt={i.alt} style={{ width: '100%', maxHeight: '25rem', maxWidth: '25rem', margin: '1rem' }} />
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
