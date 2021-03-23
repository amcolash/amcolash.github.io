import { format } from 'date-fns';
import { cssRule } from 'typestyle';
import { Colors } from '../../lib/constants';

cssRule('.dateItem .commas', {
  paddingLeft: '0 !important',

  $nest: {
    li: {
      display: 'inline',

      $nest: {
        '&::after': {
          content: '", "',
        },
        '&:last-child::after': {
          content: "''",
        },
      },
    },
  },
});

export function DateItem(props) {
  const { data } = props;
  const title = data.name || data.title || data.organization || data.institution || data.company;
  const url = data.url || data.website;
  const list = data.highlights || data.keywords;

  const dateFormat = 'MMMM y';

  return (
    <div className="dateItem" style={{ paddingTop: '1.125em' }}>
      <div style={{ display: 'flex', fontWeight: 'normal' }}>
        {url ? <a href={url}>{title}</a> : <div>{title}</div>}
        <div style={{ flex: 1 }} />
        {data.position && <div>{data.position}</div>}
      </div>
      {data.startDate && (
        <div style={{ color: Colors.Charcoal, fontSize: '0.9em', padding: '0.125em 0 .375em' }}>
          {format(new Date(data.startDate), dateFormat)} - {data.endDate ? format(new Date(data.endDate), dateFormat) : 'Present'}
        </div>
      )}
      {list && (
        <ul className={data.keywords && 'commas'} style={{ margin: 0, paddingLeft: '1.25em', listStyle: 'circle' }}>
          {list.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
