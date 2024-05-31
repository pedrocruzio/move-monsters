"use client";

import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { registerMoveLanguage } from './moveLang';

interface MonacoEditorProps {
  initialCode: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ initialCode }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      registerMoveLanguage();
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: initialCode,
        language: 'move',
        theme: 'vs-dark',
        minimap: {
          enabled: false
        }
      });
    }

    return () => {
      editorInstanceRef.current?.dispose();
    };
  }, [initialCode]);

  return <div ref={editorRef} className="h-full w-full" />;
};

export default MonacoEditor;