"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Instructions from './Instructions';
import Console from './Console';
import Navigation from './Navigation';
import Header from './Header';

const MonacoEditor = dynamic(() => import('../components/MonacoEditor'), { ssr: false });

interface LessonProps {
  lessonId: string;
}

interface LessonData {
  contentHtml: string;
  initial_code: string;
  correct_code: string;
}

const Lesson: React.FC<LessonProps> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: LessonData = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Failed to fetch lesson data:', error);
        setError('Failed to load lesson data');
      }
    };

    fetchLessonData();
  }, [lessonId]);

  const handleValidate = async () => {
    if (typeof window !== 'undefined') {
      const editor = window.monaco.editor.getModels()[0];
      const code = editor.getValue();

      try {
        const response = await fetch('/api/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, lessonId }),
        });

        const result = await response.json();

        if (result.success) {
          setOutput(result.output);
          setError(null);
        } else {
          setError(result.error);
          setOutput(null);
        }
      } catch (err) {
        setError('Validation failed');
        setOutput(null);
      }
    }
  };

  if (error) {
    return <div className="flex items-center justify-center h-screen">{error}</div>;
  }

  if (!lesson) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 h-full bg-black text-white p-4 overflow-y-auto">
          <Instructions contentHtml={lesson.contentHtml} />
        </div>
        <div className="w-2/3 flex flex-col h-full">
          <div className="flex-1 h-full">
            <MonacoEditor initialCode={lesson.initial_code} />
          </div>
          <div className="h-1/3 bg-gray-900 text-white p-4 overflow-y-auto">
            <Console />
          </div>
          <div className="p-4 bg-gray-900">
            <button onClick={handleValidate} className="bg-blue-500 text-white p-2 w-full">
              Validate Code
            </button>
            {output && <div className="mt-4 p-2 bg-green-100 text-green-800">{output}</div>}
            {error && <div className="mt-4 p-2 bg-red-100 text-red-800">{error}</div>}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Lesson;