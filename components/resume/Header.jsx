export function Header(props) {
  const { data } = props;
  return (
    <div className="header" style={{ display: 'flex' }}>
      <div className="left">
        <h1 style={{ marginTop: 0, marginBottom: 0, lineHeight: 1 }}>{data.name}</h1>
        <h2 style={{ marginTop: '0.625em' }}>{data.label}</h2>
      </div>
      <div className="right" style={{ marginLeft: 'auto' }}>
        <div>
          Email: <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>
        <div>
          Phone: <a href={`tel:${data.phone}`}>{data.phone}</a>
        </div>
        <div>
          Website: <a href={`${data.website}`}>{data.website}</a>
        </div>

        {data.profiles &&
          data.profiles.map((p) => (
            <div key={p.network}>
              {p.network}: <a href={`${p.url}`}>{p.url}</a>
            </div>
          ))}
      </div>
    </div>
  );
}
