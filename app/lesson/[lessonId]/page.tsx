"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Lesson from '../../../components/Lesson';

const LessonPage: React.FC = () => {
  const params = useParams();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  return <Lesson lessonId={lessonId} />;
};

export default LessonPage;