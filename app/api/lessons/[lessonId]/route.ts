import { NextRequest, NextResponse } from 'next/server';
import { getLessonData } from '../../../../lib/lesson';

export async function GET(req: NextRequest, { params }: { params: { lessonId: string } }) {
  try {
    const { lessonId } = params;
    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }
    const lesson = getLessonData(lessonId);
    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson data:', error);
    return NextResponse.json({ error: 'Failed to load lesson data' }, { status: 500 });
  }
}