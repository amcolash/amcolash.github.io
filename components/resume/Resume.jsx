import { Printer } from 'react-feather';
import { cssRaw, cssRule, media } from 'typestyle';
import { Colors } from '../../lib/constants';
import { Button } from '../Button';
import { Header } from './Header';
import { Section } from './Section';

// Load Open-Sans font for resume specifically
cssRaw(`@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');`);

cssRule('.resume h1, .resume h2, .resume h3, .resume', { fontWeight: 300 });

// Print Rules
cssRule('@media print', {
  '.resume .inner': {
    padding: '0 !important',
    border: 'none !important',
    background: 'none !important',
    fontSize: '0.8rem',
  },
  '.resume .buttons': {
    display: 'none !important',
  },
});

cssRule('@media screen and (max-width: 800px)', {
  '.resume .main, .resume .header': {
    flexWrap: 'wrap',
  },
  '.resume .left, .resume .right': {
    width: '100% !important',
  },
  '.resume .right': {
    paddingLeft: '0 !important',
  },
});

export function Resume(props) {
  return (
    <div
      className="resume"
      style={{ fontFamily: "'Open Sans', Arial, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="buttons" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', maxWidth: 1080, marginBottom: 20 }}>
        <Button onClick={() => window.print()} title="Print Resume">
          <Printer />
        </Button>
      </div>
      <div
        className="inner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 1080,
          background: Colors.White,
          color: Colors.Black,
          textShadow: 'none',
          margin: 10,
          padding: 40,
          boxSizing: 'border-box',
          border: `1px solid ${Colors.Black}`,
          borderRadius: 8,
        }}
      >
        <Header data={props.basics} />
        <div className="main" style={{ display: 'flex' }}>
          <div className="left" style={{ width: '35%' }}>
            <Section title="Education" data={props.education} />
            <Section title="Projects" data={props.projects} />
            <Section title="Technical Skills" data={props.skills} />
          </div>
          <div className="right" style={{ width: '65%', paddingLeft: '3.125em' }}>
            <Section title="Employment" data={props.work} />
            <Section title="Volunteering" data={props.volunteer} />
          </div>
        </div>
      </div>
    </div>
  );
}
