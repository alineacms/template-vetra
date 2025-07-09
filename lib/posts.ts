import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/sample-posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
      excerpt: matterResult.data.excerpt,
      image: matterResult.data.image,
      author: matterResult.data.author,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
      excerpt: matterResult.data.excerpt,
      image: matterResult.data.image,
      author: matterResult.data.author,
      content: contentHtml,
    };
  } catch (error) {
    return null;
  }
}

export function getPostsByCategory(category: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getPostsByAuthor(authorSlug: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.author.name.toLowerCase().replace(/\s+/g, '-') === authorSlug
  );
}

export function getAllAuthors(): Array<{ name: string; avatar: string; slug: string; postCount: number }> {
  const allPosts = getAllPosts();
  const authorsMap = new Map();
  
  allPosts.forEach(post => {
    const slug = post.author.name.toLowerCase().replace(/\s+/g, '-');
    if (authorsMap.has(slug)) {
      authorsMap.set(slug, {
        ...authorsMap.get(slug),
        postCount: authorsMap.get(slug).postCount + 1
      });
    } else {
      authorsMap.set(slug, {
        name: post.author.name,
        avatar: post.author.avatar,
        slug,
        postCount: 1
      });
    }
  });
  
  return Array.from(authorsMap.values()).sort((a, b) => b.postCount - a.postCount);
}

export const categories = {
  Lifestyle: '#FFC6A0',
  Design: '#C3E1FF',
  Technology: '#D9F8C4',
  Culture: '#E4C1F9',
  Ideas: '#FFF4C1',
};