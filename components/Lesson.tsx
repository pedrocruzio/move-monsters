"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Instructions from './Instructions';
import Console from './Console';
import Navigation from './Navigation';
import Header from './Header';
import SuccessModal from './SuccessModal';
import * as monaco from 'monaco-editor';

const MonacoEditor = dynamic(() => import('../components/MonacoEditor'), { ssr: false });

interface LessonProps {
  lessonId: string;
}

const Lesson: React.FC<LessonProps> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<{ contentHtml: string, initial_code: string, correct_code: string } | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [correctCode, setCorrectCode] = useState<string | null>(null);
  const [showCorrectCode, setShowCorrectCode] = useState<boolean>(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [nftClaimed, setNftClaimed] = useState<boolean>(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        console.log('Fetching lesson data for lessonId:', lessonId);
        const response = await fetch(`/api/lessons/${lessonId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched lesson data:', data);
        setLesson(data);
        setCorrectCode(data.correct_code);
      } catch (error) {
        console.error('Failed to fetch lesson data:', error);
        setError('Failed to load lesson data');
      }
    };

    fetchLessonData();
  }, [lessonId]);

  const handleValidate = async () => {
    const editor = monaco.editor.getModels()[0];
    const code = editor.getValue();
    console.log('Validating code for lessonId:', lessonId);
    console.log('Code:', code);

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, lessonId }), // Ensure lessonId is passed here
      });

      const text = await response.text();
      console.log('Validation response text:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error('Failed to parse JSON response:', err);
        setError('Validation failed: Invalid JSON response');
        setOutput(null);
        return;
      }

      console.log('Validation result:', result);

      if (result.success) {
        setOutput(result.message);
        setError(null);
        setIsCodeCorrect(true); // Set the state to indicate the code is correct
        setShowSuccessModal(true); // Show the success modal
      } else {
        setError(result.message);
        setOutput(null);
        setIsCodeCorrect(false); // Set the state to indicate the code is incorrect
      }
    } catch (err) {
      console.error('Validation failed:', err);
      setError('Validation failed');
      setOutput(null);
      setIsCodeCorrect(false); // Set the state to indicate the code is incorrect
    }
  };

  const handleClaimNft = () => {
    setNftClaimed(true);
    setShowSuccessModal(false);
  };

  const handleNextLesson = () => {
    if (nftClaimed) {
      const nextLessonId = parseInt(lessonId) + 1;
      router.push(`/lesson/${nextLessonId}`);
    } else {
      console.log('NFT not claimed yet');
    }
  };

  if (error && !lesson) {
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
            <Console output={output} error={error} correctCode={showCorrectCode ? correctCode : null} />
          </div>
          <div className="p-4 bg-gray-900">
            <button onClick={handleValidate} className="bg-blue-500 text-white p-2 w-full">
              Validate Code
            </button>
          </div>
        </div>
      </div>
      <Navigation lessonId={lessonId} setShowCorrectCode={setShowCorrectCode} isCodeCorrect={isCodeCorrect} />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onClaim={handleClaimNft}
        onNextLesson={handleNextLesson}
      />
    </div>
  );
};

export default Lesson;