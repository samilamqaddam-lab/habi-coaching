'use client';

import { useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 12,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newValue =
      value.substring(0, start) +
      before +
      textToInsert +
      after +
      value.substring(end);

    onChange(newValue);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    insertMarkdown(prefix, '', 'Titre');
  };

  const insertList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue =
      value.substring(0, lineStart) +
      '- ' +
      value.substring(lineStart);

    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2);
    }, 0);
  };

  const insertNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue =
      value.substring(0, lineStart) +
      '1. ' +
      value.substring(lineStart);

    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 3, start + 3);
    }, 0);
  };

  const toolbarButtons = [
    {
      label: 'H1',
      icon: 'H1',
      action: () => insertHeading(1),
      tooltip: 'Titre niveau 1',
    },
    {
      label: 'H2',
      icon: 'H2',
      action: () => insertHeading(2),
      tooltip: 'Titre niveau 2',
    },
    {
      label: 'H3',
      icon: 'H3',
      action: () => insertHeading(3),
      tooltip: 'Titre niveau 3',
    },
    {
      label: 'B',
      icon: '𝐁',
      action: () => insertMarkdown('**', '**', 'texte en gras'),
      tooltip: 'Gras',
    },
    {
      label: 'I',
      icon: '𝐼',
      action: () => insertMarkdown('*', '*', 'texte en italique'),
      tooltip: 'Italique',
    },
    {
      label: 'Link',
      icon: '🔗',
      action: () => insertMarkdown('[', '](https://)', 'texte du lien'),
      tooltip: 'Lien',
    },
    {
      label: 'Quote',
      icon: '❝',
      action: () => insertMarkdown('> ', '', 'citation'),
      tooltip: 'Citation',
    },
    {
      label: 'List',
      icon: '•',
      action: () => insertList(),
      tooltip: 'Liste à puces',
    },
    {
      label: 'NumberedList',
      icon: '1.',
      action: () => insertNumberedList(),
      tooltip: 'Liste numérotée',
    },
    {
      label: 'Code',
      icon: '</>',
      action: () => insertMarkdown('`', '`', 'code'),
      tooltip: 'Code inline',
    },
  ];

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-700 border border-slate-600 rounded-lg">
        {toolbarButtons.map((button, index) => (
          <button
            key={button.label}
            type="button"
            onClick={button.action}
            title={button.tooltip}
            className={`px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-600 rounded transition-colors ${
              ['H1', 'H2', 'H3'].includes(button.label) ? 'font-bold' : ''
            } ${
              button.label === 'B' ? 'font-bold' : ''
            } ${
              button.label === 'I' ? 'italic' : ''
            }`}
          >
            {button.icon}
          </button>
        ))}

        {/* Divider */}
        <div className="h-6 w-px bg-slate-500 mx-1" />

        {/* Helper text */}
        <span className="text-xs text-slate-400 ml-2">
          Sélectionnez du texte et cliquez sur un bouton pour formater
        </span>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm leading-relaxed resize-y"
      />

      {/* Character count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{value.length} caractères</span>
        <span>Markdown supporté</span>
      </div>
    </div>
  );
}
