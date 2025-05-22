import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './components/Toolbar';
import PaperEditor from './components/PaperEditor';
import Sidebar from './components/Sidebar';
import { PaperData, Section } from './types/paper';

const initialPaperData: PaperData = {
  title: 'Your Paper Title Here',
  authors: [
    {
      name: 'Author Name',
      affiliation: 'Institution Name',
      email: 'author@institution.edu'
    }
  ],
  abstract: 'Write your abstract here. This should be a concise summary of your work, typically 150-250 words.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  sections: [
    {
      id: '1',
      title: 'Introduction',
      content: '<p>Write your introduction here. This section should provide background information and motivation for your work.</p>',
      type: 'text'
    },
    {
      id: '2',
      title: 'Related Work',
      content: '<p>Discuss related work and how your contribution differs from existing approaches.</p>',
      type: 'text'
    },
    {
      id: '3',
      title: 'Methodology',
      content: '<p>Describe your methodology and approach in detail.</p>',
      type: 'text'
    },
    {
      id: '4',
      title: 'Results',
      content: '<p>Present your experimental results and findings.</p>',
      type: 'text'
    },
    {
      id: '5',
      title: 'Conclusion',
      content: '<p>Summarize your contributions and suggest future work.</p>',
      type: 'text'
    }
  ],
  references: [
    {
      id: '1',
      authors: 'Smith, J. and Doe, A.',
      title: 'Example Paper Title',
      journal: 'IEEE Transactions on Example Topic',
      volume: '10',
      number: '2',
      pages: '123-135',
      year: '2023'
    }
  ],
  figures: [],
  tables: []
};

function App() {
  const [paperData, setPaperData] = useState<PaperData>(initialPaperData);
  const [activeSection, setActiveSection] = useState<string>('1');
  const [showPreview, setShowPreview] = useState(false);

  const updatePaperData = (updates: Partial<PaperData>) => {
    setPaperData(prev => ({ ...prev, ...updates }));
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: 'New Section',
      content: '<p>Enter your content here...</p>',
      type: 'text'
    };
    setPaperData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const deleteSection = (sectionId: string) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const reorderSections = (dragIndex: number, hoverIndex: number) => {
    setPaperData(prev => {
      const newSections = [...prev.sections];
      const draggedSection = newSections[dragIndex];
      newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, draggedSection);
      return { ...prev, sections: newSections };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <Toolbar 
          onTogglePreview={() => setShowPreview(!showPreview)}
          showPreview={showPreview}
          paperData={paperData}
        />
        
        <div className="flex">
          <Sidebar 
            sections={paperData.sections}
            activeSection={activeSection}
            onSectionSelect={setActiveSection}
            onAddSection={addSection}
            onDeleteSection={deleteSection}
            onReorderSections={reorderSections}
          />
          
          <main className="flex-1">
            <PaperEditor 
              paperData={paperData}
              activeSection={activeSection}
              showPreview={showPreview}
              onUpdatePaperData={updatePaperData}
              onUpdateSection={updateSection}
            />
          </main>
        </div>
      </div>
    </DndProvider>
  );
}

export default App; 