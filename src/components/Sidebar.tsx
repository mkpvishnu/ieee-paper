import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, Plus, Trash2, FileText } from 'lucide-react';
import { Section } from '../types/paper';

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
  onDelete: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  section,
  index,
  isActive,
  onSelect,
  onDelete,
  onMove
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'section',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all duration-150
        ${isActive 
          ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500' 
          : 'hover:bg-gray-100 text-gray-700'
        }
        ${isDragging ? 'opacity-50' : ''}
      `}
      onClick={onSelect}
    >
      <div className="flex items-center flex-1 min-w-0">
        <GripVertical size={16} className="text-gray-400 mr-2 flex-shrink-0" />
        <FileText size={16} className="mr-2 flex-shrink-0" />
        <span className="truncate text-sm font-medium">
          {section.title}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-150"
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
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
          <button
            onClick={onAddSection}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150"
          >
            <Plus size={16} className="mr-1" />
            Add
          </button>
        </div>
      </div>

      <div className="py-2">
        {sections.map((section, index) => (
          <DraggableSection
            key={section.id}
            section={section}
            index={index}
            isActive={section.id === activeSection}
            onSelect={() => onSectionSelect(section.id)}
            onDelete={() => onDeleteSection(section.id)}
            onMove={onReorderSections}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500 space-y-1">
          <div>Total sections: {sections.length}</div>
          <div>Click to edit, drag to reorder</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 