import fs from 'fs';
import { join, relative } from 'path';
import matter from 'gray-matter';

export const postsDirectory = join(process.cwd(), '_posts');
export const projectsDirectory = join(process.cwd(), '_projects');

// simple recursive file walking based off of: https://stackoverflow.com/a/50121975/2303432
export function traverseDir(dir, root) {
  const files = [];

  fs.readdirSync(dir).forEach((file) => {
    let fullPath = join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath, root).forEach((f) => files.push(f));
    } else {
      files.push(relative(root, fullPath));
    }
  });

  return files;
}

export function getDataBySlug(slug, root, fields = []) {
  const combinedSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const realSlug = combinedSlug.replace(/\.md$/, '');
  const fullPath = join(root, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }

    if (field === 'date' && typeof items[field] === 'object') items[field] = items[field].toISOString();
  });

  return items;
}

export function getAllData(fields = [], root) {
  const slugs = traverseDir(root, root);
  const posts = slugs
    .map((slug) => getDataBySlug(slug, root, fields))
    // sort data by date in descending order
    .sort((data1, data2) => (data1.date > data2.date ? '-1' : '1'));
  return posts;
}
