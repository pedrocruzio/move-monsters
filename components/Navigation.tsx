import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navigation: React.FC<{ lessonId: string, setShowCorrectCode: (show: boolean) => void, isCodeCorrect: boolean }> = ({ lessonId, setShowCorrectCode, isCodeCorrect }) => {
  const router = useRouter();
  const [totalLessons, setTotalLessons] = useState<number>(0);

  useEffect(() => {
    const fetchTotalLessons = async () => {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) {
          throw new Error('Failed to fetch lessons data');
        }
        const data = await response.json();
        setTotalLessons(data.length);
      } catch (error) {
        console.error('Error fetching lessons data:', error);
      }
    };

    fetchTotalLessons();
  }, []);

  const showAnswer = async () => {
    try {
      console.log('Fetching correct code for lessonId:', lessonId);
      const response = await fetch(`/api/lessons/${lessonId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch lesson data');
      }
      const data = await response.json();
      console.log('Fetched lesson data:', data);
      console.log('Correct code:', data.correct_code);
      setShowCorrectCode(true); // Set the state to show the correct code
    } catch (error) {
      console.error('Error fetching lesson data:', error);
    }
  };

  const goToNextLesson = () => {
    const nextLessonId = parseInt(lessonId) + 1;
    if (nextLessonId <= totalLessons) {
      router.push(`/lesson/${nextLessonId}`);
    }
  };

  const goToPreviousLesson = () => {
    const prevLessonId = parseInt(lessonId) - 1;
    if (prevLessonId > 0) {
      router.push(`/lesson/${prevLessonId}`);
    }
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-center space-x-4">
      <button onClick={showAnswer} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Show Answer</button>
      {parseInt(lessonId) > 1 && (
        <button onClick={goToPreviousLesson} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Previous Lesson</button>
      )}
      <span className="text-white py-2 px-4">Lesson {lessonId} of {totalLessons}</span>
      {isCodeCorrect && (
        <button onClick={goToNextLesson} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Next Lesson</button>
      )}
    </div>
  );
};

export default Navigation;