import { DateItem } from './DateItem';

export function Section(props) {
  return (
    <div className="section">
      <h3 style={{ marginBottom: 0, fontSize: '1.4em', fontWeight: 'normal', borderBottom: '1px solid #ccc', paddingBottom: 4 }}>
        {props.title}
      </h3>

      {props.data.map((i) => {
        const key = i.name || i.title || i.organization || i.institution || i.company;
        return <DateItem data={i} key={key} />;
      })}
    </div>
  );
}
