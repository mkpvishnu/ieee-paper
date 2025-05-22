import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Reference } from '../types/paper';

interface ReferenceManagerProps {
  references: Reference[];
  onUpdate: (references: Reference[]) => void;
}

const ReferenceManager: React.FC<ReferenceManagerProps> = ({ references, onUpdate }) => {
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      authors: '',
      title: '',
      journal: '',
      year: new Date().getFullYear().toString(),
      volume: '',
      number: '',
      pages: ''
    };
    onUpdate([...references, newReference]);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    const updatedReferences = references.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    onUpdate(updatedReferences);
  };

  const removeReference = (id: string) => {
    onUpdate(references.filter(ref => ref.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">References</h2>
        <button
          onClick={addReference}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Add Reference
        </button>
      </div>

      <div className="space-y-6">
        {references.map((reference, index) => (
          <div key={reference.id} className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">[{index + 1}] Reference</h3>
              <button
                onClick={() => removeReference(reference.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authors *
                </label>
                <input
                  type="text"
                  value={reference.authors}
                  onChange={(e) => updateReference(reference.id, 'authors', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Smith, J. and Doe, A."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateReference(reference.id, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Paper title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Journal/Conference
                </label>
                <input
                  type="text"
                  value={reference.journal || ''}
                  onChange={(e) => updateReference(reference.id, 'journal', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="IEEE Transactions on..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="text"
                  value={reference.year}
                  onChange={(e) => updateReference(reference.id, 'year', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="2023"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume
                </label>
                <input
                  type="text"
                  value={reference.volume || ''}
                  onChange={(e) => updateReference(reference.id, 'volume', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number
                </label>
                <input
                  type="text"
                  value={reference.number || ''}
                  onChange={(e) => updateReference(reference.id, 'number', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pages
                </label>
                <input
                  type="text"
                  value={reference.pages || ''}
                  onChange={(e) => updateReference(reference.id, 'pages', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="123-135"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DOI
                </label>
                <input
                  type="text"
                  value={reference.doi || ''}
                  onChange={(e) => updateReference(reference.id, 'doi', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="10.1109/..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {references.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No references added yet. Click "Add Reference" to get started.
        </div>
      )}
    </div>
  );
};

export default ReferenceManager; 