import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './components/Toolbar';
import PaperEditor from './components/PaperEditor';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import { PaperData, Section, Figure, Table } from './types/paper';
import { Editor } from '@tiptap/react';

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

const LOCAL_STORAGE_KEY = 'ieeePaperData';

// Helper to load from localStorage
const loadDataFromLocalStorage = (): PaperData | null => {
  try {
    const serializedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return null;
  }
};

function App() {
  const [paperData, setPaperData] = useState<PaperData>(() => {
    const savedData = loadDataFromLocalStorage();
    return savedData || initialPaperData;
  });
  const [activeSection, setActiveSection] = useState<string>(() => {
    const savedActiveSection = localStorage.getItem('activeSectionId');
    if (savedActiveSection) return savedActiveSection;
    const currentPaper = loadDataFromLocalStorage() || initialPaperData;
    return currentPaper.sections[0]?.id || '1';
  });
  const [showPreview, setShowPreview] = useState(false);
  const [activeTiptapEditor, setActiveTiptapEditor] = useState<Editor | null>(null);
  const [isClearConfirmModalOpen, setIsClearConfirmModalOpen] = useState(false);

  // Auto-save paperData to localStorage with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const serializedData = JSON.stringify(paperData);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedData);
        console.log("Paper data saved to localStorage.");
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }, 1000); // Debounce time: 1 second

    return () => {
      clearTimeout(handler);
    };
  }, [paperData]);

  // Save activeSection to localStorage
  useEffect(() => {
    localStorage.setItem('activeSectionId', activeSection);
  }, [activeSection]);

  // Function to override paperData, e.g., when loading from JSON file
  const loadNewPaperData = (newPaperData: PaperData) => {
    setPaperData(newPaperData);
    // Optionally, set active section to the first section of the new data
    if (newPaperData.sections.length > 0) {
      setActiveSection(newPaperData.sections[0].id);
    }
  };

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

  // Figure management handlers
  const addFigure = (figure: Figure) => {
    setPaperData(prev => ({
      ...prev,
      figures: [...prev.figures, figure]
    }));
  };

  const removeFigure = (figureId: string) => {
    setPaperData(prev => ({
      ...prev,
      figures: prev.figures.filter(fig => fig.id !== figureId)
    }));
  };

  const updateFigureCaption = (figureId: string, caption: string) => {
    setPaperData(prev => ({
      ...prev,
      figures: prev.figures.map(fig => 
        fig.id === figureId ? { ...fig, caption } : fig
      )
    }));
  };

  // Table management handlers
  const addTable = (table: Table) => {
    setPaperData(prev => ({
      ...prev,
      tables: [...prev.tables, table]
    }));
  };

  const removeTable = (tableId: string) => {
    setPaperData(prev => ({
      ...prev,
      tables: prev.tables.filter(table => table.id !== tableId)
    }));
  };

  const updateTable = (tableId: string, updates: Partial<Table>) => {
    setPaperData(prev => ({
      ...prev,
      tables: prev.tables.map(table => 
        table.id === tableId ? { ...table, ...updates } : table
      )
    }));
  };

  const handleEditorChange = (editor: Editor | null) => {
    setActiveTiptapEditor(editor);
  };

  const openClearConfirmModal = () => {
    setIsClearConfirmModalOpen(true);
  };

  const confirmClearProject = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('activeSectionId');
    setPaperData(initialPaperData);
    setActiveSection(initialPaperData.sections[0]?.id || '1');
    setIsClearConfirmModalOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <Toolbar 
          onTogglePreview={() => setShowPreview(!showPreview)}
          showPreview={showPreview}
          paperData={paperData}
          onLoadFromFile={loadNewPaperData}
          onClearProject={openClearConfirmModal}
          activeEditor={activeTiptapEditor}
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
              onAddFigure={addFigure}
              onRemoveFigure={removeFigure}
              onUpdateFigureCaption={updateFigureCaption}
              onAddTable={addTable}
              onRemoveTable={removeTable}
              onUpdateTable={updateTable}
              onEditorChange={handleEditorChange}
            />
          </main>
        </div>

        <Modal
          isOpen={isClearConfirmModalOpen}
          onClose={() => setIsClearConfirmModalOpen(false)}
          title="Confirm Clear Project"
          footer={(
            <>
              <button 
                onClick={() => setIsClearConfirmModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={confirmClearProject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Clear Project
              </button>
            </>
          )}
        >
          <p className="text-sm text-gray-700">
            Are you sure you want to clear the current project? All unsaved changes and data in LocalStorage will be lost. This action cannot be undone.
          </p>
        </Modal>

      </div>
    </DndProvider>
  );
}

export default App; 