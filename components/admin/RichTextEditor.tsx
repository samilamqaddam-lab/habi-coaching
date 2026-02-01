'use client';

import { useRef, useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Commencez à écrire...',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const valueRef = useRef(value);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Callback ref qui se déclenche quand la div est montée dans le DOM
  const setEditorRef = (node: HTMLDivElement | null) => {
    editorRef.current = node;

    // Charger le contenu initial quand le node est monté
    if (node && valueRef.current) {
      node.innerHTML = valueRef.current;
    }
  };

  // Mettre à jour valueRef quand value change
  useEffect(() => {
    valueRef.current = value;

    // Si l'éditeur existe déjà et que value change, mettre à jour
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const wrapSelection = (tag: string, className?: string) => {
    if (!mounted) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
      const element = document.createElement(tag);
      if (className) element.className = className;

      try {
        range.deleteContents();
        element.textContent = selectedText;
        range.insertNode(element);

        // Move cursor after inserted element
        range.setStartAfter(element);
        range.setEndAfter(element);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        console.error('Error wrapping selection:', e);
      }

      handleInput();
    }
  };

  const insertHeading = (level: 1 | 2 | 3) => {
    if (!mounted) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || 'Titre';

    const classNames = {
      1: 'font-heading text-4xl font-bold text-deep-blue mt-12 mb-6',
      2: 'font-heading text-3xl font-bold text-deep-blue mt-10 mb-5',
      3: 'font-heading text-2xl font-bold text-deep-blue mt-8 mb-4',
    };

    const heading = document.createElement(`h${level}`);
    heading.className = classNames[level];
    heading.textContent = selectedText;

    try {
      range.deleteContents();
      range.insertNode(heading);

      // Add line break after heading
      const br = document.createElement('br');
      heading.after(br);

      // Move cursor after heading
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.error('Error inserting heading:', e);
    }

    handleInput();
  };

  const toggleFormat = (format: 'bold' | 'italic') => {
    if (!mounted) return;
    document.execCommand(format, false);
    handleInput();
  };

  const createLink = () => {
    if (!mounted) return;
    const url = prompt('Entrez l\'URL du lien:');
    if (url) {
      document.execCommand('createLink', false, url);
      // Apply Tailwind classes to the created link
      const selection = window.getSelection();
      if (selection && selection.anchorNode) {
        const link = selection.anchorNode.parentElement;
        if (link && link.tagName === 'A') {
          link.className = 'text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors';
        }
      }
      handleInput();
    }
  };

  const insertBlockquote = () => {
    if (!mounted) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || 'Citation';

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'border-l-4 border-terracotta pl-6 my-8 italic text-text-secondary';
    blockquote.textContent = selectedText;

    try {
      range.deleteContents();
      range.insertNode(blockquote);

      const br = document.createElement('br');
      blockquote.after(br);

      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.error('Error inserting blockquote:', e);
    }

    handleInput();
  };

  const insertList = (ordered: boolean) => {
    if (!mounted) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || 'Élément de liste';

    const list = document.createElement(ordered ? 'ol' : 'ul');
    list.className = ordered
      ? 'list-decimal list-outside ml-6 mb-6 space-y-2'
      : 'list-disc list-outside ml-6 mb-6 space-y-2';

    const li = document.createElement('li');
    li.className = 'text-text-primary leading-relaxed';
    li.textContent = selectedText;

    list.appendChild(li);

    try {
      range.deleteContents();
      range.insertNode(list);

      const br = document.createElement('br');
      list.after(br);

      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.error('Error inserting list:', e);
    }

    handleInput();
  };

  const insertParagraph = () => {
    if (!mounted) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || 'Paragraphe';

    const p = document.createElement('p');
    p.className = 'text-text-primary leading-relaxed mb-6';
    p.textContent = selectedText;

    try {
      range.deleteContents();
      range.insertNode(p);

      const br = document.createElement('br');
      p.after(br);

      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.error('Error inserting paragraph:', e);
    }

    handleInput();
  };

  const toolbarButtons = [
    {
      label: 'P',
      action: insertParagraph,
      tooltip: 'Paragraphe normal',
      className: 'text-sm',
    },
    {
      label: 'H1',
      action: () => insertHeading(1),
      tooltip: 'Titre niveau 1 (très grand)',
      className: 'text-xl font-bold',
    },
    {
      label: 'H2',
      action: () => insertHeading(2),
      tooltip: 'Titre niveau 2 (grand)',
      className: 'text-lg font-bold',
    },
    {
      label: 'H3',
      action: () => insertHeading(3),
      tooltip: 'Titre niveau 3 (moyen)',
      className: 'text-base font-bold',
    },
    {
      divider: true,
    },
    {
      icon: '𝐁',
      action: () => toggleFormat('bold'),
      tooltip: 'Gras',
      className: 'font-bold',
    },
    {
      icon: '𝐼',
      action: () => toggleFormat('italic'),
      tooltip: 'Italique',
      className: 'italic',
    },
    {
      divider: true,
    },
    {
      icon: '🔗',
      action: createLink,
      tooltip: 'Insérer un lien',
    },
    {
      icon: '❝',
      action: insertBlockquote,
      tooltip: 'Citation',
    },
    {
      divider: true,
    },
    {
      icon: '•',
      action: () => insertList(false),
      tooltip: 'Liste à puces',
    },
    {
      icon: '1.',
      action: () => insertList(true),
      tooltip: 'Liste numérotée',
    },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-700 border border-slate-600 rounded-lg">
        {toolbarButtons.map((button, index) => {
          if (button.divider) {
            return <div key={`divider-${index}`} className="h-6 w-px bg-slate-500 mx-1" />;
          }

          return (
            <button
              key={button.label || button.icon || index}
              type="button"
              onClick={button.action}
              title={button.tooltip}
              className={`px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-600 rounded transition-colors ${
                button.className || ''
              }`}
            >
              {button.icon || button.label}
            </button>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="text-xs text-slate-400 bg-slate-800 border border-slate-600 rounded p-2">
        💡 <strong>Comment utiliser:</strong> Sélectionnez du texte puis cliquez sur un bouton pour appliquer le formatage.
        Pour les titres et blocs, le texte sélectionné sera converti.
      </div>

      {/* Editor */}
      <div
        ref={setEditorRef}
        contentEditable
        dir="ltr"
        onInput={handleInput}
        suppressContentEditableWarning
        className="min-h-[400px] max-h-[600px] overflow-y-auto w-full px-6 py-4 bg-white border-2 border-slate-600 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-left"
        style={{
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          unicodeBidi: 'plaintext',
        }}
        data-placeholder={placeholder}
      />

      {/* Character count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{value.length} caractères</span>
        <span>✨ Éditeur WYSIWYG - Les styles correspondent au site</span>
      </div>

      {/* Custom styles for editor placeholder */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
