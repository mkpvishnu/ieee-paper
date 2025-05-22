import React from 'react';
import { Editor } from '@tiptap/react';
import { Figure, Table } from '../types/paper';
import { ChevronRight, ChevronLeft, LibraryBig, Image as ImageIcon, ListOrdered as TableIcon } from 'lucide-react'; // Added specific icons

interface FigureTableSidebarProps {
  figures: Figure[];
  tables: Table[];
  editor: Editor | null;
  isOpen: boolean;
  onToggle: () => void;
}

const FigureTableSidebar: React.FC<FigureTableSidebarProps> = ({ figures, tables, editor, isOpen, onToggle }) => {
  if (!isOpen) {
    // Optionally, render a small tab/button to open it if preferred over the main editor toolbar button
    return (
      <button 
        onClick={onToggle} 
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-l-md shadow-lg z-30 transition-colors"
        title="Open Figures/Tables List"
      >
        <LibraryBig size={20} />
      </button>
    );
  }

  const handleInsertReference = (type: 'FIGURE' | 'TABLE', id: string) => {
    if (editor) {
      editor.chain().focus().insertContent(`[[${type}:${id}]]`).run();
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full bg-slate-50 border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-30 ${isOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-700">Figures & Tables</h3>
          <button onClick={onToggle} className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
              <ImageIcon size={16} className="mr-2 text-blue-500" /> Figures ({figures.length})
            </h4>
            {figures.length > 0 ? (
              <ul className="space-y-1">
                {figures.map(fig => (
                  <li key={fig.id} className="text-xs p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 flex justify-between items-center">
                    <div className="truncate">
                      <span className="font-medium text-gray-700">{fig.id}</span>: <span className="text-gray-600">{fig.caption || 'No caption'}</span>
                    </div>
                    <button 
                      onClick={() => handleInsertReference('FIGURE', fig.id)}
                      className="ml-2 px-2 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors whitespace-nowrap"
                    >
                      Insert Ref
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">No figures added yet.</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
              <TableIcon size={16} className="mr-2 text-green-500" /> Tables ({tables.length})
            </h4>
            {tables.length > 0 ? (
              <ul className="space-y-1">
                {tables.map(table => (
                  <li key={table.id} className="text-xs p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 flex justify-between items-center">
                     <div className="truncate">
                      <span className="font-medium text-gray-700">{table.id}</span>: <span className="text-gray-600">{table.caption || 'No caption'}</span>
                    </div>
                    <button 
                      onClick={() => handleInsertReference('TABLE', table.id)}
                      className="ml-2 px-2 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors whitespace-nowrap"
                    >
                      Insert Ref
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">No tables added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureTableSidebar; 