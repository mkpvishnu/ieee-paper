import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, PlusCircle, Trash2, FileText } from 'lucide-react';
import { Section } from '../types/paper';
import { useNotification } from '../contexts/NotificationContext';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
  onAddSection: () => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (dragIndex: number, hoverIndex: number) => void;
}

interface DraggableSectionProps {
  section: Section;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (sectionId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  itemCount: number;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  section,
  index,
  isActive,
  onSelect,
  onDelete,
  onMove,
  itemCount
}) => {
  const { addNotification } = useNotification();
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'section',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem: { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemCount <= 1) {
      addNotification("Cannot delete the last section.", "warning");
    } else {
      onDelete(section.id);
    }
  };

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`flex justify-between items-center p-2.5 rounded-md cursor-pointer transition-colors duration-150 text-sm ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200'} ${isDragging ? 'opacity-50 bg-gray-300' : ''}`}
      title={section.title || 'Untitled Section'}
    >
      <div className="flex items-center min-w-0">
        <GripVertical size={16} className="text-gray-400 mr-2 flex-shrink-0 cursor-grab" />
        <FileText size={16} className={`mr-2 flex-shrink-0 ${isActive ? 'text-blue-200' : 'text-gray-500'}`} />
        <span className="truncate" title={section.title}>{section.title || 'Untitled Section'}</span>
      </div>
      <button 
        onClick={handleDelete}
        className={`ml-2 p-1 rounded transition-colors duration-150 ${isActive ? 'text-blue-100 hover:text-white hover:bg-blue-400' : 'text-gray-400 hover:text-red-500 hover:bg-red-100'}`}
        title="Delete section"
        disabled={itemCount <= 1}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  onSectionSelect,
  onAddSection,
  onDeleteSection,
  onReorderSections
}) => {
  return (
    <aside className="w-72 bg-slate-50 p-4 space-y-4 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto flex flex-col">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 px-1">Sections</h2>
        <button
          onClick={onAddSection}
          className="w-full flex items-center justify-center px-3 py-2.5 mb-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm hover:shadow-md"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Section
        </button>
      </div>
      <ul className="space-y-1.5 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {sections.map((section, index) => (
          <DraggableSection
            key={section.id}
            index={index}
            section={section}
            isActive={activeSection === section.id}
            onSelect={() => onSectionSelect(section.id)}
            onDelete={onDeleteSection}
            onMove={onReorderSections}
            itemCount={sections.length}
          />
        ))}
      </ul>
      <div className="mt-auto pt-4 text-xs text-slate-500 border-t border-gray-200 flex-shrink-0">
          <p>Total sections: {sections.length}</p>
          <p>Drag sections to reorder.</p>
      </div>
    </aside>
  );
};

export default Sidebar; 