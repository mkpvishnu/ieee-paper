import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Author } from '../types/paper';

interface AuthorEditorProps {
  authors: Author[];
  onUpdate: (authors: Author[]) => void;
}

const AuthorEditor: React.FC<AuthorEditorProps> = ({ authors, onUpdate }) => {
  const addAuthor = () => {
    const newAuthor: Author = {
      name: '',
      affiliation: '',
      email: ''
    };
    onUpdate([...authors, newAuthor]);
  };

  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const updatedAuthors = authors.map((author, i) => 
      i === index ? { ...author, [field]: value } : author
    );
    onUpdate(updatedAuthors);
  };

  const removeAuthor = (index: number) => {
    onUpdate(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-4xl mx-auto my-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700">Authors</h2>
        <button
          onClick={addAuthor}
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm hover:shadow-md"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Author
        </button>
      </div>

      {authors.length === 0 && (
        <p className="text-center text-slate-500 py-4">No authors added yet. Click "Add Author" to begin.</p>
      )}

      <div className="space-y-6">
        {authors.map((author, index) => (
          <div key={index} className="bg-slate-50 p-4 md:p-6 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-slate-600">Author {index + 1}</h3>
              <button
                onClick={() => removeAuthor(index)}
                type="button"
                className="p-1.5 text-slate-500 rounded-md hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
                title="Remove Author"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <label htmlFor={`author-name-${index}`} className="block text-sm font-medium text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  id={`author-name-${index}`}
                  type="text"
                  value={author.name}
                  onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              
              <div>
                <label htmlFor={`author-affiliation-${index}`} className="block text-sm font-medium text-slate-600 mb-1">
                  Affiliation
                </label>
                <input
                  id={`author-affiliation-${index}`}
                  type="text"
                  value={author.affiliation}
                  onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., University of Example"
                />
              </div>
              
              <div>
                <label htmlFor={`author-email-${index}`} className="block text-sm font-medium text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  id={`author-email-${index}`}
                  type="email"
                  value={author.email}
                  onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., jane.doe@example.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorEditor; 