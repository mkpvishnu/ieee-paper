import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Bold, Italic, Underline, List, ListOrdered, Quote, Code, Link } from 'lucide-react';

interface RichTextEditorProps {
  editor: Editor | null;
  content: string;
  onUpdate: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ editor, content, onUpdate }) => {
  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const formatButtons = [
    { icon: Bold, command: 'toggleBold', active: 'bold' },
    { icon: Italic, command: 'toggleItalic', active: 'italic' },
    { icon: Underline, command: 'toggleUnderline', active: 'underline' },
    { icon: List, command: 'toggleBulletList', active: 'bulletList' },
    { icon: ListOrdered, command: 'toggleOrderedList', active: 'orderedList' },
    { icon: Quote, command: 'toggleBlockquote', active: 'blockquote' },
    { icon: Code, command: 'toggleCodeBlock', active: 'codeBlock' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Formatting Toolbar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => editor.chain().focus()[button.command]().run()}
            className={`p-2 rounded transition-colors duration-150 ${
              editor.isActive(button.active)
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <button.icon size={16} />
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="min-h-96 p-4 prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor; 