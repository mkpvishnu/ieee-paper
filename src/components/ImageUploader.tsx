import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Figure } from '../types/paper';

interface ImageUploaderProps {
  figures: Figure[];
  onAddFigure: (figure: Figure) => void;
  onRemoveFigure: (figureId: string) => void;
  onUpdateCaption: (figureId: string, caption: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  figures,
  onAddFigure,
  onRemoveFigure,
  onUpdateCaption
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newFigure: Figure = {
          id: `fig-${Date.now().toString(36).substr(2, 5)}`,
          src: reader.result as string,
          caption: 'Enter figure caption here',
          width: undefined,
          height: undefined
        };
        onAddFigure(newFigure);
      };
      reader.readAsDataURL(file);
    });
  }, [onAddFigure]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
    },
    multiple: true
  });

  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-4xl mx-auto my-8">
      <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-4 border-b border-slate-200">Manage Figures</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-200 ease-in-out ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 text-blue-600'
            : 'border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-600'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 mb-3" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium mb-1">
              Drag & drop images, or click to select
            </p>
            <p className="text-xs text-slate-400">
              PNG, JPG, GIF, SVG, WebP up to 10MB each
            </p>
          </div>
        )}
      </div>

      {figures.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Uploaded Figures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {figures.map((figure) => (
              <div key={figure.id} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                <div className="p-3 border-b border-slate-200 bg-white flex justify-between items-center">
                  <div className="flex items-center">
                    <ImageIcon size={18} className="mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-xs font-mono text-slate-600 select-all" title="Figure ID">{figure.id}</span>
                  </div>
                  <button
                    onClick={() => onRemoveFigure(figure.id)}
                    type="button"
                    className="p-1.5 text-slate-400 rounded-md hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
                    title="Remove Figure"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="aspect-[16/10] bg-slate-200 overflow-hidden">
                  <img
                    src={figure.src}
                    alt={figure.caption || 'Uploaded figure'}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <label htmlFor={`caption-${figure.id}`} className="sr-only">Caption for {figure.id}</label>
                  <textarea
                    id={`caption-${figure.id}`}
                    value={figure.caption}
                    onChange={(e) => onUpdateCaption(figure.id, e.target.value)}
                    className="w-full flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white resize-y min-h-[60px] placeholder-slate-400"
                    rows={2}
                    placeholder="Enter figure caption..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
       {figures.length === 0 && (
        <div className="mt-10 text-center">
            <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-500">No figures uploaded yet</h3>
            <p className="text-sm text-slate-400">Use the area above to add your first figure.</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 