"use client";

import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { registerMoveLanguage } from './moveLang';

const MonacoEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      registerMoveLanguage();
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: `module HelloWorld {
  public fun hello() {
    let greeting = "Hello, world!";
    move_to(&greeting);
  }
}`,
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
  }, []);

  return <div ref={editorRef} className="h-full w-full" />;
};

export default MonacoEditor;
