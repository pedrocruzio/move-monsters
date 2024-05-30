import * as monaco from 'monaco-editor';

export const moveLanguage = {
  id: 'move',
  extensions: ['.move'],
  aliases: ['Move', 'move'],
  loader: () => import('monaco-editor/esm/vs/basic-languages/rust/rust'), // Use Rust as a base
};

export function registerMoveLanguage() {
  monaco.languages.register(moveLanguage);

  monaco.languages.setMonarchTokensProvider('move', {
    keywords: [
      'module', 'script', 'struct', 'public', 'fun', 'let', 'move', 'copy', 'mut', 'return', 'if', 'else', 'while', 'loop', 'break', 'continue', 'abort', 'has', 'borrow_global', 'borrow_global_mut', 'exists', 'move_from', 'move_to'
    ],
    operators: ['+', '-', '*', '/', '%', '==', '!=', '>', '<', '>=', '<=', '&&', '||', '!', '=', '+=', '-=', '*=', '/=', '%=', '=>'],
    symbols: /[=><!~?:&|+\-*\/^%]+/,
    tokenizer: {
      root: [
        [/[a-z_$][\w$]*/, {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],
        [/[A-Z][\w\$]*/, 'type.identifier'],
        { include: '@whitespace' },
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/\d+/, 'number'],
        [/[;,.]/, 'delimiter'],
        [/"([^"\\]|\\.)*$/, 'string.invalid'], 
        [/"/, 'string', '@string'],
      ],
      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],
      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],
    },
  });

  monaco.languages.setLanguageConfiguration('move', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' }
    ],
  });
}
