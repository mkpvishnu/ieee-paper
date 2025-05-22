import React from 'react';

interface TitleEditorProps {
  title: string;
  onUpdate: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ title, onUpdate }) => {
  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-3xl mx-auto my-8">
      <label htmlFor="paperTitle" className="block text-xl font-semibold mb-3 text-slate-700">
        Paper Title
      </label>
      <textarea
        id="paperTitle"
        value={title}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full px-4 py-3 text-xl font-medium border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white"
        rows={3}
        placeholder="Enter your paper title here..."
      />
      <p className="mt-3 text-sm text-slate-500">
        Keep your title concise and descriptive. IEEE papers typically have titles under 100 characters.
      </p>
    </div>
  );
};

export default TitleEditor; 