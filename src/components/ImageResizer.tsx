import React, { useState } from 'react';
import { RotateCw, Move, Maximize2, Minimize2 } from 'lucide-react';

interface ImageResizerProps {
  src: string;
  alt: string;
  onResize: (width: number, height: number) => void;
  onMove: (x: number, y: number) => void;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ src, alt, onResize, onMove }) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 150 });
  const [isSelected, setIsSelected] = useState(false);

  const handleResize = (newWidth: number, newHeight: number) => {
    const updatedDimensions = { width: newWidth, height: newHeight };
    setDimensions(updatedDimensions);
    onResize(newWidth, newHeight);
  };

  const presetSizes = [
    { label: 'Small', width: 150, height: 112 },
    { label: 'Medium', width: 250, height: 187 },
    { label: 'Large', width: 350, height: 262 },
    { label: 'Full Width', width: 400, height: 300 }
  ];

  return (
    <div className={`relative inline-block ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <img
        src={src}
        alt={alt}
                style={{          width: `${dimensions.width}px`,          height: `${dimensions.height}px`,          maxWidth: '100%'        }}
        className="block"
        onClick={() => setIsSelected(!isSelected)}
      />
      
      {isSelected && (
        <div className="absolute top-0 right-0 bg-white border border-gray-300 rounded shadow-lg p-2 z-10">
          <div className="text-xs font-medium mb-2">Resize Image</div>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {presetSizes.map((size) => (
              <button
                key={size.label}
                onClick={() => handleResize(size.width, size.height)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {size.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 text-xs">
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => handleResize(parseInt(e.target.value) || 0, dimensions.height)}
              className="w-16 px-1 py-1 border rounded text-xs"
              placeholder="Width"
            />
            <span>×</span>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => handleResize(dimensions.width, parseInt(e.target.value) || 0)}
              className="w-16 px-1 py-1 border rounded text-xs"
              placeholder="Height"
            />
          </div>
          
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setIsSelected(false)}
              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer; 