import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface AbstractEditorProps {
  abstract: string;
  keywords: string[];
  onUpdate: (updates: { abstract?: string; keywords?: string[] }) => void;
}

const AbstractEditor: React.FC<AbstractEditorProps> = ({ abstract, keywords, onUpdate }) => {
  const [newKeywordInput, setNewKeywordInput] = useState('');

  const handleAddKeyword = () => {
    if (newKeywordInput.trim() !== '' && !keywords.includes(newKeywordInput.trim())) {
      onUpdate({ keywords: [...keywords, newKeywordInput.trim()] });
      setNewKeywordInput('');
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    onUpdate({ keywords: keywords.filter((_, index) => index !== indexToRemove) });
  };

  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-3xl mx-auto my-8">
      <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-4 border-b border-slate-200">Abstract & Keywords</h2>
      
      <div className="space-y-8">
        <div>
          <label htmlFor="abstract-text" className="block text-lg font-semibold text-slate-700 mb-2">
            Abstract
          </label>
          <textarea
            id="abstract-text"
            value={abstract}
            onChange={(e) => onUpdate({ abstract: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white resize-y min-h-[150px]"
            rows={10}
            placeholder="Write a concise summary of your work (typically 150-250 words). Include the problem, approach, key results, and conclusions."
          />
          <p className="mt-1 text-xs text-slate-500 text-right">
            Words: {abstract.split(/\s+/).filter(word => word.length > 0).length}
          </p>
        </div>

        <div>
          <label htmlFor="keywords-input" className="block text-lg font-semibold text-slate-700 mb-3">
            Keywords
          </label>
          <div className="flex items-center gap-2 mb-3">
            <input
              id="keywords-input"
              type="text"
              value={newKeywordInput}
              onChange={(e) => setNewKeywordInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }}
              className="flex-grow px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Add a keyword..."
            />
            <button
              onClick={handleAddKeyword}
              type="button"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <PlusCircle size={18} className="mr-1.5" />
              Add
            </button>
          </div>
          
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-2 border border-slate-200 rounded-md min-h-[40px] bg-slate-50">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-600/20 shadow-sm"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    type="button"
                    className="ml-1.5 -mr-0.5 p-0.5 rounded-full text-sky-600 hover:bg-sky-200 hover:text-sky-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    aria-label={`Remove ${keyword}`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
          
          <p className="text-xs text-slate-500">
            Add 3-5 keywords that best describe your research area and methods. Press Enter or click Add.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AbstractEditor; 