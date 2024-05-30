import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const lessonsDirectory = path.join(process.cwd(), 'lessons');

export function getLessonData(lessonId: string) {
  try {
    const fullPath = path.join(lessonsDirectory, `${lessonId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContents);
    return { lessonId, contentHtml: content, ...data };
  } catch (error) {
    console.error('Error reading lesson data:', error);
    throw error;
  }
}