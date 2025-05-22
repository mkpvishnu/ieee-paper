import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { PaperData, Section, Figure, Table as TableType } from '../types/paper';
import PaperPreview from './PaperPreview';
import RichTextEditor from './RichTextEditor';
import TitleEditor from './TitleEditor';
import AuthorEditor from './AuthorEditor';
import AbstractEditor from './AbstractEditor';
import ReferenceManager from './ReferenceManager';
import ImageUploader from './ImageUploader';
import TableBuilder from './TableBuilder';
import FigureTableSidebar from './FigureTableSidebar';

interface PaperEditorProps {
  paperData: PaperData;
  activeSection: string;
  showPreview: boolean;
  onUpdatePaperData: (updates: Partial<PaperData>) => void;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onAddFigure: (figure: Figure) => void;
  onRemoveFigure: (figureId: string) => void;
  onUpdateFigureCaption: (figureId: string, caption: string) => void;
  onAddTable: (table: TableType) => void;
  onRemoveTable: (tableId: string) => void;
  onUpdateTable: (tableId: string, updates: Partial<TableType>) => void;
  onEditorChange: (editor: Editor | null) => void;
}

const PaperEditor: React.FC<PaperEditorProps> = ({
  paperData,
  activeSection,
  showPreview,
  onUpdatePaperData,
  onUpdateSection,
  onAddFigure,
  onRemoveFigure,
  onUpdateFigureCaption,
  onAddTable,
  onRemoveTable,
  onUpdateTable,
  onEditorChange
}) => {
  const [editMode, setEditMode] = useState<'content' | 'title' | 'authors' | 'abstract' | 'references' | 'images' | 'tables'>('content');
  const [isFigureTableSidebarOpen, setIsFigureTableSidebarOpen] = useState(false);

  const currentSection = paperData.sections.find(section => section.id === activeSection);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
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

  React.useEffect(() => {
    if (editMode === 'content') {
      onEditorChange(editor);
    } else {
      onEditorChange(null);
    }
    return () => {
    };
  }, [editor, editMode, onEditorChange]);

  const toggleFigureTableSidebar = () => {
    setIsFigureTableSidebarOpen(!isFigureTableSidebarOpen);
  };

  if (showPreview) {
    return <PaperPreview paperData={paperData} />;
  }

  const renderEditor = () => {
    switch (editMode) {
      case 'title':
        return (
          <TitleEditor
            title={paperData.title}
            onUpdate={(title: string) => onUpdatePaperData({ title })}
          />
        );
      case 'authors':
        return (
          <AuthorEditor
            authors={paperData.authors}
            onUpdate={(authors: any) => onUpdatePaperData({ authors })}
          />
        );
      case 'abstract':
        return (
          <AbstractEditor
            abstract={paperData.abstract}
            keywords={paperData.keywords}
            onUpdate={(updates: any) => onUpdatePaperData(updates)}
          />
        );
      case 'references':
        return (
          <ReferenceManager
            references={paperData.references}
            onUpdate={(references: any) => onUpdatePaperData({ references })}
          />
        );
      case 'images':
        return (
          <ImageUploader
            figures={paperData.figures}
            onAddFigure={onAddFigure}
            onRemoveFigure={onRemoveFigure}
            onUpdateCaption={onUpdateFigureCaption}
          />
        );
      case 'tables':
        return (
          <TableBuilder
            tables={paperData.tables}
            onAddTable={onAddTable}
            onRemoveTable={onRemoveTable}
            onUpdateTable={onUpdateTable}
          />
        );
      default:
        return (
          <div className="h-full flex relative">
            <div className="flex-1 h-full">
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
                      onUpdate={(content: string) => onUpdateSection(currentSection.id, { content })}
                      figures={paperData.figures}
                      tables={paperData.tables}
                      onToggleFigureTableSidebar={toggleFigureTableSidebar}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a section to start editing
                </div>
              )}
            </div>
            <FigureTableSidebar 
              figures={paperData.figures}
              tables={paperData.tables}
              editor={editor}
              isOpen={isFigureTableSidebarOpen}
              onToggle={toggleFigureTableSidebar}
            />
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Mode Selector */}
      <div className="flex border-b border-gray-200 bg-white overflow-x-auto sticky top-0 z-40">
        {[
          { key: 'content', label: 'Content' },
          { key: 'title', label: 'Title' },
          { key: 'authors', label: 'Authors' },
          { key: 'abstract', label: 'Abstract' },
          { key: 'images', label: 'Images' },
          { key: 'tables', label: 'Tables' },
          { key: 'references', label: 'References' }
        ].map((mode) => (
          <button
            key={mode.key}
            onClick={() => setEditMode(mode.key as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 whitespace-nowrap focus:outline-none ${
              editMode === mode.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        {renderEditor()}
      </div>
    </div>
  );
};

export default PaperEditor; 