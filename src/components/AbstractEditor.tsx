import React from 'react';
import { Plus, X } from 'lucide-react';

interface AbstractEditorProps {
  abstract: string;
  keywords: string[];
  onUpdate: (updates: { abstract?: string; keywords?: string[] }) => void;
}

const AbstractEditor: React.FC<AbstractEditorProps> = ({ abstract, keywords, onUpdate }) => {
  const addKeyword = () => {
    onUpdate({ keywords: [...keywords, ''] });
  };

  const updateKeyword = (index: number, value: string) => {
    const updatedKeywords = keywords.map((keyword, i) => 
      i === index ? value : keyword
    );
    onUpdate({ keywords: updatedKeywords });
  };

  const removeKeyword = (index: number) => {
    onUpdate({ keywords: keywords.filter((_, i) => i !== index) });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Abstract & Keywords</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Abstract *
          </label>
          <textarea
            value={abstract}
            onChange={(e) => onUpdate({ abstract: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows={8}
            placeholder="Write a concise summary of your work (150-250 words). Include the problem, approach, key results, and conclusions."
          />
          <p className="mt-1 text-sm text-gray-600">
            Current length: {abstract.split(' ').filter(word => word.length > 0).length} words
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <button
              onClick={addKeyword}
              className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus size={14} className="mr-1" />
              Add Keyword
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                  placeholder={`Keyword ${index + 1}`}
                />
                <button
                  onClick={() => removeKeyword(index)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <p className="mt-2 text-sm text-gray-600">
            Add 3-5 keywords that best describe your research area and methods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AbstractEditor; 