import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { PaperData, Section } from '../types/paper';
import PaperPreview from './PaperPreview';
import RichTextEditor from './RichTextEditor';
import TitleEditor from './TitleEditor';
import AuthorEditor from './AuthorEditor';
import AbstractEditor from './AbstractEditor';
import ReferenceManager from './ReferenceManager';

interface PaperEditorProps {
  paperData: PaperData;
  activeSection: string;
  showPreview: boolean;
  onUpdatePaperData: (updates: Partial<PaperData>) => void;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
}

const PaperEditor: React.FC<PaperEditorProps> = ({
  paperData,
  activeSection,
  showPreview,
  onUpdatePaperData,
  onUpdateSection
}) => {
  const [editMode, setEditMode] = useState<'content' | 'title' | 'authors' | 'abstract' | 'references'>('content');

  const currentSection = paperData.sections.find(section => section.id === activeSection);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: currentSection?.content || '',
    onUpdate: ({ editor }) => {
      if (currentSection) {
        onUpdateSection(currentSection.id, {
          content: editor.getHTML()
        });
      }
    },
  });

  React.useEffect(() => {
    if (editor && currentSection) {
      editor.commands.setContent(currentSection.content);
    }
  }, [editor, currentSection]);

  if (showPreview) {
    return <PaperPreview paperData={paperData} />;
  }

  const renderEditor = () => {
    switch (editMode) {
      case 'title':
        return (
          <TitleEditor
            title={paperData.title}
            onUpdate={(title) => onUpdatePaperData({ title })}
          />
        );
      case 'authors':
        return (
          <AuthorEditor
            authors={paperData.authors}
            onUpdate={(authors) => onUpdatePaperData({ authors })}
          />
        );
      case 'abstract':
        return (
          <AbstractEditor
            abstract={paperData.abstract}
            keywords={paperData.keywords}
            onUpdate={(updates) => onUpdatePaperData(updates)}
          />
        );
      case 'references':
        return (
          <ReferenceManager
            references={paperData.references}
            onUpdate={(references) => onUpdatePaperData({ references })}
          />
        );
      default:
        return (
          <div className="h-full">
            {currentSection ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <input
                    type="text"
                    value={currentSection.title}
                    onChange={(e) => onUpdateSection(currentSection.id, { title: e.target.value })}
                    className="text-xl font-semibold bg-transparent border-none outline-none flex-1"
                    placeholder="Section Title"
                  />
                </div>
                <div className="flex-1 p-4">
                  <RichTextEditor
                    editor={editor}
                    content={currentSection.content}
                    onUpdate={(content) => onUpdateSection(currentSection.id, { content })}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a section to start editing
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Mode Selector */}
      <div className="flex border-b border-gray-200 bg-white">
        {[
          { key: 'content', label: 'Content' },
          { key: 'title', label: 'Title' },
          { key: 'authors', label: 'Authors' },
          { key: 'abstract', label: 'Abstract' },
          { key: 'references', label: 'References' }
        ].map((mode) => (
          <button
            key={mode.key}
            onClick={() => setEditMode(mode.key as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 ${
              editMode === mode.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {renderEditor()}
      </div>
    </div>
  );
};

export default PaperEditor; 