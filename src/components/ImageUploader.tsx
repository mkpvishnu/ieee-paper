import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X } from 'lucide-react';
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
          id: Date.now().toString(),
          src: reader.result as string,
          caption: 'Enter figure caption here',
          width: undefined,
          height: undefined
        };
        onAddFigure(newFigure);
      };
      reader.readAsDataURL(file);
    });
  }, [figures.length, onAddFigure]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
    },
    multiple: true
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Figures & Images</h2>
      
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, JPEG, GIF, SVG, WebP
            </p>
          </div>
        )}
      </div>

      {/* Figure Gallery */}
      {figures.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Uploaded Figures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {figures.map((figure) => (
              <div key={figure.id} className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={figure.src}
                    alt={figure.caption}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => onRemoveFigure(figure.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Image size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Figure {figure.id}</span>
                  </div>
                  <textarea
                    value={figure.caption}
                    onChange={(e) => onUpdateCaption(figure.id, e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                    rows={2}
                    placeholder="Enter figure caption..."
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    Click and drag this figure into your document
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 