'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

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
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none min-h-[400px] px-6 py-4 focus:outline-none',
        dir: 'ltr',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[400px] bg-white border-2 border-slate-600 rounded-lg flex items-center justify-center">
        <span className="text-slate-400">Chargement de l'éditeur...</span>
      </div>
    );
  }

  const addLink = () => {
    const url = prompt('Entrez l\'URL du lien:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-slate-200 hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-700 border border-slate-600 rounded-lg">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Paragraphe"
        >
          P
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Titre 1"
        >
          <span className="text-xl font-bold">H1</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Titre 2"
        >
          <span className="text-lg font-bold">H2</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Titre 3"
        >
          <span className="font-bold">H3</span>
        </ToolbarButton>

        <div className="h-6 w-px bg-slate-500 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Gras"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italique"
        >
          <span className="italic">I</span>
        </ToolbarButton>

        <div className="h-6 w-px bg-slate-500 mx-1" />

        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          title="Lien"
        >
          🔗
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Citation"
        >
          ❝
        </ToolbarButton>

        <div className="h-6 w-px bg-slate-500 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Liste à puces"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Liste numérotée"
        >
          1.
        </ToolbarButton>
      </div>

      {/* Instructions */}
      <div className="text-xs text-slate-400 bg-slate-800 border border-slate-600 rounded p-2">
        💡 <strong>Comment utiliser:</strong> Tapez du texte, sélectionnez-le et cliquez sur les boutons pour formater.
      </div>

      {/* Editor */}
      <div className="bg-white border-2 border-slate-600 rounded-lg overflow-hidden">
        <EditorContent
          editor={editor}
          className="min-h-[400px] max-h-[600px] overflow-y-auto text-slate-900"
        />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{editor.storage.characterCount?.characters?.() || value.length} caractères</span>
        <span>✨ Éditeur TipTap - Expérience d'écriture professionnelle</span>
      </div>

      {/* Styles for TipTap */}
      <style jsx global>{`
        .ProseMirror {
          direction: ltr !important;
          text-align: left !important;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          font-style: italic;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1A3A4A;
        }
        .ProseMirror h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          color: #1A3A4A;
        }
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1A3A4A;
        }
        .ProseMirror p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #C67B5C;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6B6B6B;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
