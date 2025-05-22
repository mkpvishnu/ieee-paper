import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Authors</h2>
        <button
          onClick={addAuthor}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Add Author
        </button>
      </div>

      <div className="space-y-6">
        {authors.map((author, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Author {index + 1}</h3>
              <button
                onClick={() => removeAuthor(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={author.name}
                  onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliation *
                </label>
                <input
                  type="text"
                  value={author.affiliation}
                  onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Institution/Organization"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={author.email}
                  onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="email@domain.com"
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