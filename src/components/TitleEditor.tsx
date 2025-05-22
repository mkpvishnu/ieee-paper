import React from 'react';

interface TitleEditorProps {
  title: string;
  onUpdate: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ title, onUpdate }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Paper Title</h2>
      <textarea
        value={title}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full p-4 text-2xl font-bold text-center border border-gray-300 rounded-lg resize-none"
        rows={3}
        placeholder="Enter your paper title here..."
      />
      <p className="mt-2 text-sm text-gray-600">
        Keep your title concise and descriptive. IEEE papers typically have titles under 100 characters.
      </p>
    </div>
  );
};

export default TitleEditor; 