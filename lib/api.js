import fs from 'fs';
import { join, relative } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

// simple recursive file walking based off of: https://stackoverflow.com/a/50121975/2303432
export function traverseDir(dir) {
  const files = [];

  fs.readdirSync(dir).forEach((file) => {
    let fullPath = join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath).forEach((f) => files.push(f));
    } else {
      files.push(relative(postsDirectory, fullPath));
    }
  });

  return files;
}

export function getPostSlugs() {
  return traverseDir(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const combinedSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const realSlug = combinedSlug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return posts;
}
