import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image,
  Table,
  FileText,
  Download,
  Eye,
  EyeOff,
  Save,
  Undo,
  Redo,
  Plus
} from 'lucide-react';
import { PaperData } from '../types/paper';

interface ToolbarProps {
  onTogglePreview: () => void;
  showPreview: boolean;
  paperData: PaperData;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  onTogglePreview, 
  showPreview, 
  paperData 
}) => {
  const handleExportPDF = () => {
    // PDF export functionality will be implemented
    console.log('Exporting to PDF...');
  };

  const handleSave = () => {
    // Save functionality will be implemented
    const dataStr = JSON.stringify(paperData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ieee-paper.json';
    link.click();
  };

  const toolbarButtons = [
    {
      group: 'file',
      buttons: [
        { icon: Save, tooltip: 'Save', onClick: handleSave },
        { icon: Download, tooltip: 'Export PDF', onClick: handleExportPDF },
        { icon: showPreview ? EyeOff : Eye, tooltip: showPreview ? 'Hide Preview' : 'Show Preview', onClick: onTogglePreview }
      ]
    },
    {
      group: 'format',
      buttons: [
        { icon: Bold, tooltip: 'Bold', onClick: () => document.execCommand('bold') },
        { icon: Italic, tooltip: 'Italic', onClick: () => document.execCommand('italic') },
        { icon: Underline, tooltip: 'Underline', onClick: () => document.execCommand('underline') }
      ]
    },
    {
      group: 'align',
      buttons: [
        { icon: AlignLeft, tooltip: 'Align Left', onClick: () => document.execCommand('justifyLeft') },
        { icon: AlignCenter, tooltip: 'Align Center', onClick: () => document.execCommand('justifyCenter') },
        { icon: AlignRight, tooltip: 'Align Right', onClick: () => document.execCommand('justifyRight') }
      ]
    },
    {
      group: 'insert',
      buttons: [
        { icon: Image, tooltip: 'Insert Image', onClick: () => console.log('Insert image') },
        { icon: Table, tooltip: 'Insert Table', onClick: () => console.log('Insert table') },
        { icon: FileText, tooltip: 'Insert Reference', onClick: () => console.log('Insert reference') }
      ]
    },
    {
      group: 'edit',
      buttons: [
        { icon: Undo, tooltip: 'Undo', onClick: () => document.execCommand('undo') },
        { icon: Redo, tooltip: 'Redo', onClick: () => document.execCommand('redo') }
      ]
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <h1 className="text-lg font-semibold text-gray-900 mr-4">IEEE Paper Editor</h1>
          
          {toolbarButtons.map((group, groupIndex) => (
            <div key={group.group} className="flex items-center">
              {groupIndex > 0 && <div className="w-px h-6 bg-gray-300 mx-2" />}
              <div className="flex items-center space-x-1">
                {group.buttons.map((button, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    onClick={button.onClick}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-150"
                    title={button.tooltip}
                  >
                    <button.icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {paperData.sections.length} sections
          </span>
          <span className="text-sm text-gray-500">
            {paperData.references.length} references
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar; 