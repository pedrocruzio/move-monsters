import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const lessonsDir = path.join(process.cwd(), 'lessons'); // Adjust the path here
    const lessonFiles = fs.readdirSync(lessonsDir);
    const lessons = lessonFiles.map((file) => {
      const lessonId = path.basename(file, path.extname(file));
      return { id: lessonId };
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Failed to load lessons' }, { status: 500 });
  }
}