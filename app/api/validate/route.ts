import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const lessonsDirectory = path.join(process.cwd(), 'lessons');

export async function POST(req: NextRequest) {
  try {
    const { code, lessonId } = await req.json();
    console.log('Received POST request with body:', { code, lessonId });

    if (!lessonId) {
      console.log('Lesson ID is missing');
      return NextResponse.json({ success: false, message: 'Lesson ID is required' }, { status: 400 });
    }

    // Read the lesson file to get the correct code
    const fullPath = path.join(lessonsDirectory, `${lessonId}.md`);
    if (!fs.existsSync(fullPath)) {
      console.log('Lesson not found:', fullPath);
      return NextResponse.json({ success: false, message: 'Lesson not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const correctCode = matterResult.data.correct_code;

    console.log('Correct code:', correctCode);
    console.log('Submitted code:', code);

    // Normalize code by removing all whitespace characters
    const normalizeCode = (str: string) => str.replace(/\s+/g, '');

    const isValid = normalizeCode(code) === normalizeCode(correctCode);

    if (isValid) {
      console.log('Code is correct');
      return NextResponse.json({ success: true, message: 'Code is correct!' });
    } else {
      console.log('Code is incorrect');
      return NextResponse.json({ success: false, message: 'Code is incorrect.' });
    }
  } catch (error) {
    console.error('Error in POST /api/validate:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  console.log('Received GET request');
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}