const fs = require('fs');
const path = require('path');

const data = require('./data.json');
const projects = path.join(__dirname, '../');

data.forEach((d) => {
  let markdown = '';
  markdown += `---
title: ${d.name.indexOf("'") === -1 ? `'${d.name}'` : `"${d.name}"`}
date: ${d.date_range}
section: ${d.section}
thumbnail: ${d.thumbnail}`;

  if (d.links) {
    markdown += '\nlinks:\n';
    d.links.forEach(
      (l, i) =>
        (markdown += `- _target:
  title: ${l.title}
  url: ${l.url}${i !== d.links.length - 1 ? '\n' : ''}`)
    );
  }

  if (d.images) {
    markdown += '\nimages:\n';
    d.images.forEach((i) => (markdown += `- ${i}\n`));
  }

  if (d.video) markdown += `\nvideo: ${d.video}`;
  markdown += `\n---\n\n${d.description}`;

  fs.writeFileSync(
    path.join(
      projects,
      d.name
        .toLowerCase()
        .replace(/\ /g, '-')
        .replace(/[\:\']/g, '') + '.md'
    ),
    markdown
  );
});
