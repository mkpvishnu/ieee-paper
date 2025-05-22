import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit3, Save, XCircle, BookOpen } from 'lucide-react';
import { Reference } from '../types/paper';

interface ReferenceManagerProps {
  references: Reference[];
  onUpdate: (references: Reference[]) => void;
}

interface ReferenceItemProps {
  reference: Reference;
  index: number;
  onUpdateField: (id: string, field: keyof Reference, value: string) => void;
  onRemove: (id: string) => void;
  totalReferences: number;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ reference, index, onUpdateField, onRemove, totalReferences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputBaseClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors";

  const getReferenceDisplayString = () => {
    let display = reference.authors.split(',')[0] || '[No Author]';
    if (reference.year) display += ` (${reference.year})`;
    if (reference.title) display += `: ${reference.title.substring(0, 50)}${reference.title.length > 50 ? '...' : ''}`;
    else display += ': [No Title]';
    return display;
  };

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
      <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-slate-600 text-sm">[{index + 1}]</span>
            {!isEditing && (
                <p className="text-sm text-slate-700 truncate" title={getReferenceDisplayString()}>{getReferenceDisplayString()}</p>
            )}
             {isEditing && <p className="text-sm text-slate-700 font-medium">Editing Reference...</p>}
        </div>
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            type="button"
            className={`p-1.5 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-colors ${isEditing ? 'text-amber-600 hover:text-amber-700' : 'text-slate-500 hover:text-slate-700'}`}
            title={isEditing ? 'Cancel Edit' : 'Edit Reference'}
          >
            {isEditing ? <XCircle size={16} /> : <Edit3 size={16} />}
          </button>
          <button 
            onClick={() => onRemove(reference.id)}
            type="button" 
            disabled={totalReferences <= 0 && isEditing}
            className="p-1.5 text-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remove Reference">
              <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor={`ref-authors-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Authors*</label>
              <input id={`ref-authors-${reference.id}`} type="text" value={reference.authors} onChange={(e) => onUpdateField(reference.id, 'authors', e.target.value)} className={inputBaseClass} placeholder="Smith, J. and Doe, A."/>
            </div>
            <div>
              <label htmlFor={`ref-title-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Title*</label>
              <input id={`ref-title-${reference.id}`} type="text" value={reference.title} onChange={(e) => onUpdateField(reference.id, 'title', e.target.value)} className={inputBaseClass} placeholder="Paper title"/>
            </div>
            <div>
              <label htmlFor={`ref-journal-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Journal/Conference</label>
              <input id={`ref-journal-${reference.id}`} type="text" value={reference.journal || ''} onChange={(e) => onUpdateField(reference.id, 'journal', e.target.value)} className={inputBaseClass} placeholder="IEEE Transactions on..."/>
            </div>
            <div>
              <label htmlFor={`ref-year-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Year*</label>
              <input id={`ref-year-${reference.id}`} type="text" value={reference.year} onChange={(e) => onUpdateField(reference.id, 'year', e.target.value)} className={`${inputBaseClass} w-full sm:w-32`} placeholder="YYYY"/>
            </div>
            <div>
              <label htmlFor={`ref-volume-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Volume</label>
              <input id={`ref-volume-${reference.id}`} type="text" value={reference.volume || ''} onChange={(e) => onUpdateField(reference.id, 'volume', e.target.value)} className={`${inputBaseClass} w-full sm:w-24`} placeholder="10"/>
            </div>
            <div>
              <label htmlFor={`ref-number-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Number/Issue</label>
              <input id={`ref-number-${reference.id}`} type="text" value={reference.number || ''} onChange={(e) => onUpdateField(reference.id, 'number', e.target.value)} className={`${inputBaseClass} w-full sm:w-24`} placeholder="2"/>
            </div>
            <div>
              <label htmlFor={`ref-pages-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">Pages</label>
              <input id={`ref-pages-${reference.id}`} type="text" value={reference.pages || ''} onChange={(e) => onUpdateField(reference.id, 'pages', e.target.value)} className={`${inputBaseClass} w-full sm:w-32`} placeholder="123-135"/>
            </div>
            <div>
              <label htmlFor={`ref-doi-${reference.id}`} className="block text-xs font-medium text-slate-600 mb-1">DOI</label>
              <input id={`ref-doi-${reference.id}`} type="text" value={reference.doi || ''} onChange={(e) => onUpdateField(reference.id, 'doi', e.target.value)} className={inputBaseClass} placeholder="10.1109/..."/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReferenceManager: React.FC<ReferenceManagerProps> = ({ references, onUpdate }) => {
  const addReference = () => {
    const newReference: Reference = {
      id: `ref-${Date.now().toString(36).substr(2, 5)}_${Math.random().toString(36).substr(2, 5)}`,
      authors: '',
      title: '',
      journal: '',
      year: new Date().getFullYear().toString(),
      volume: '',
      number: '',
      pages: '',
      doi: ''
    };
    onUpdate([...references, newReference]);
  };

  const updateReferenceField = (id: string, field: keyof Reference, value: string) => {
    const updatedReferences = references.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    onUpdate(updatedReferences);
  };

  const removeReference = (id: string) => {
    onUpdate(references.filter(ref => ref.id !== id));
  };

  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-4xl mx-auto my-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700">Manage References</h2>
        <button
          onClick={addReference}
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors shadow-sm hover:shadow-md"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Reference
        </button>
      </div>

      {references.length === 0 && (
         <div className="mt-10 text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-500">No references added yet</h3>
            <p className="text-sm text-slate-400">Click "Add Reference" to build your bibliography.</p>
        </div>
      )}

      <div className="space-y-4">
        {references.map((reference, index) => (
          <ReferenceItem 
            key={reference.id} 
            reference={reference} 
            index={index} 
            onUpdateField={updateReferenceField} 
            onRemove={removeReference}
            totalReferences={references.length}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferenceManager; 