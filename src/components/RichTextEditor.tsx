import React, { useState } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Bold, Italic, List, ListOrdered, Quote, Code, Image, Table as TableIconLucide, LibraryBig } from 'lucide-react';
import { Figure, Table } from '../types/paper';
import Modal from './Modal';
import { useNotification } from '../contexts/NotificationContext';

interface RichTextEditorProps {
  editor: Editor | null;
  content: string;
  onUpdate: (content: string) => void;
  figures: Figure[];
  tables: Table[];
  onToggleFigureTableSidebar: () => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  editor, 
  content, 
  onUpdate, 
  figures,
  tables,
  onToggleFigureTableSidebar
}) => {
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [referenceType, setReferenceType] = useState<'FIGURE' | 'TABLE' | null>(null);
  const [selectedReferenceId, setSelectedReferenceId] = useState('');
  const { addNotification } = useNotification();

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const openReferenceModal = (type: 'FIGURE' | 'TABLE') => {
    setReferenceType(type);
    setIsReferenceModalOpen(true);
    setSelectedReferenceId('');
  };

  const handleInsertReference = () => {
    if (!selectedReferenceId) {
      addNotification('Please enter an ID for the reference.', 'warning');
      return;
    }

    if (editor && referenceType) {
      const items = referenceType === 'FIGURE' ? figures : tables;
      const itemExists = items.some(item => item.id === selectedReferenceId);

      if (itemExists) {
        editor.chain().focus().insertContent(`[[${referenceType}:${selectedReferenceId}]]`).run();
        addNotification(`${referenceType === 'FIGURE' ? 'Figure' : 'Table'} reference inserted.`, 'success');
        setIsReferenceModalOpen(false);
        setReferenceType(null);
      } else {
        addNotification(`${referenceType === 'FIGURE' ? 'Figure' : 'Table'} with ID "${selectedReferenceId}" not found. Please check the ID or add the item first.`, 'error');
      }
    }
  };

  const formatButtons = [
    { 
      icon: Bold, 
      action: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive('bold'),
      tooltip: 'Bold'
    },
    { 
      icon: Italic, 
      action: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor.isActive('italic'),
      tooltip: 'Italic'
    },
    { 
      icon: List, 
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor.isActive('bulletList'),
      tooltip: 'Bullet List'
    },
    { 
      icon: ListOrdered, 
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: () => editor.isActive('orderedList'),
      tooltip: 'Numbered List'
    },
    { 
      icon: Quote, 
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: () => editor.isActive('blockquote'),
      tooltip: 'Quote'
    },
    { 
      icon: Code, 
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: () => editor.isActive('codeBlock'),
      tooltip: 'Code Block'
    },
    {
      icon: Image,
      action: () => openReferenceModal('FIGURE'),
      active: () => false,
      tooltip: 'Insert Figure Reference'
    },
    {
      icon: TableIconLucide,
      action: () => openReferenceModal('TABLE'),
      active: () => false,
      tooltip: 'Insert Table Reference'
    },
    {
      icon: LibraryBig,
      action: onToggleFigureTableSidebar,
      active: () => false,
      tooltip: 'Toggle Figures/Tables List'
    }
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Formatting Toolbar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`p-2 rounded transition-colors duration-150 m-1 ${
              button.active()
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={button.tooltip}
          >
            <button.icon size={16} />
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="min-h-96 p-4 prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>

      {/* Helper text */}
      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        💡 Tip: Use 📷 to insert figure references and 📊 to insert table references. Manage actual media in the Images/Tables tabs.
      </div>

      {isReferenceModalOpen && referenceType && (
        <Modal
          isOpen={isReferenceModalOpen}
          onClose={() => {
            setIsReferenceModalOpen(false);
            setReferenceType(null);
          }}
          title={`Insert ${referenceType === 'FIGURE' ? 'Figure' : 'Table'} Reference`}
          footer={(
            <>
              <button 
                onClick={() => {
                  setIsReferenceModalOpen(false);
                  setReferenceType(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleInsertReference}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Insert Reference
              </button>
            </>
          )}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the ID of the {referenceType === 'FIGURE' ? 'figure' : 'table'} you want to reference.
              Available {referenceType === 'FIGURE' ? 'figures' : 'tables'} (ID - Caption):
            </p>
            <ul className="max-h-40 overflow-y-auto text-sm border rounded-md p-2 bg-gray-50">
              {(referenceType === 'FIGURE' ? figures : tables).map(item => (
                <li key={item.id} className="py-1">
                  <span className="font-semibold">{item.id}</span>: {item.caption || 'No caption'}
                </li>
              ))}
              {(referenceType === 'FIGURE' ? figures : tables).length === 0 && (
                <li className="text-gray-500">
                    No {referenceType === 'FIGURE' ? 'figures' : 'tables'} available. Add them in the dedicated tabs first.
                </li>
              )}
            </ul>
            <input 
              type="text"
              value={selectedReferenceId}
              onChange={(e) => setSelectedReferenceId(e.target.value.trim())}
              placeholder={`${referenceType === 'FIGURE' ? 'Figure' : 'Table'} ID (e.g., fig1, table_results)`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              autoFocus
            />
             {/* Basic validation message area - can be improved */}
             {selectedReferenceId && !(referenceType === 'FIGURE' ? figures : tables).some(item => item.id === selectedReferenceId) && (
                <p className="text-xs text-red-500">ID not found in the list above.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RichTextEditor; 