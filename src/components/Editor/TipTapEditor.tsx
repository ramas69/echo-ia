'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo,
  Underline as UnderlineIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const toggleLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const items = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'Italic' },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), label: 'Underline' },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), label: 'H1' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'H2' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: 'Bullet List' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), label: 'Ordered List' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: 'Quote' },
    { icon: LinkIcon, action: toggleLink, active: editor.isActive('link'), label: 'Link' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={(e) => { e.preventDefault(); item.action(); }}
          className={cn(
            "p-2 rounded-lg transition-all hover:bg-white",
            item.active ? "text-[var(--gold-vivid)] bg-white shadow-sm" : "text-[var(--text-secondary)]/60"
          )}
          title={item.label}
        >
          <item.icon className="w-4 h-4" />
        </button>
      ))}
      <div className="w-px h-4 bg-[var(--border-subtle)] mx-2 self-center" />
      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 text-[var(--text-secondary)]/40 hover:text-[var(--text-secondary)]"><Undo className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 text-[var(--text-secondary)]/40 hover:text-[var(--text-secondary)]"><Redo className="w-4 h-4" /></button>
    </div>
  );
};

export default function TipTapEditor({ content, onChange, placeholder }: TipTapEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder || 'Commencez à rédiger...' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-6 text-[var(--text-primary)] leading-relaxed',
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[300px] bg-[var(--bg-secondary)]/10 animate-pulse rounded-2xl border border-[var(--border-subtle)]" />;
  }

  return (
    <div className="bg-white border border-[var(--border-subtle)] rounded-2xl overflow-hidden focus-within:border-[var(--gold-vivid)] transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

