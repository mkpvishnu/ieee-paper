import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image as ImageIcon,
  Table as TableIcon,
  FileText as FileTextIcon,
  Download,
  Eye,
  EyeOff,
  Save,
  Undo,
  Redo,
  Plus,
  FileUp,
  Trash2
} from 'lucide-react';
import { PaperData } from '../types/paper';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Editor } from '@tiptap/react';
import { useNotification } from '../contexts/NotificationContext';

interface ToolbarButton {
  icon: React.ElementType;
  tooltip: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

interface ButtonGroup {
  group: string;
  buttons: ToolbarButton[];
}

interface ToolbarProps {
  onTogglePreview: () => void;
  showPreview: boolean;
  paperData: PaperData;
  onLoadFromFile: (data: PaperData) => void;
  onClearProject: () => void;
  activeEditor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  onTogglePreview, 
  showPreview, 
  paperData, 
  onLoadFromFile,
  onClearProject,
  activeEditor
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotification();

  const handleExportPDF = async () => {
    const previewElement = document.getElementById('ieee-page-container');

    if (!previewElement) {
      addNotification('Preview element not found. Please ensure you are in preview mode to export PDF.', 'error');
      return;
    }

    addNotification('Starting PDF export... This may take a moment.', 'info');
    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = 8.5;
      const pdfHeight = 11;
      const margin = 0.75;
      const contentWidth = pdfWidth - (2 * margin);
      const contentHeight = pdfHeight - (2 * margin);

      const img = document.createElement('img');
      img.src = imgData;
      await new Promise<void>(resolve => { img.onload = () => resolve(); });

      const aspectRatio = img.width / img.height;

      let finalImgWidth = contentWidth;
      let finalImgHeight = contentWidth / aspectRatio;

      if (finalImgHeight > contentHeight) {
        finalImgHeight = contentHeight;
        finalImgWidth = contentHeight * aspectRatio;
      }

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'in',
        format: 'letter'
      });

      const xPos = margin + (contentWidth - finalImgWidth) / 2;
      const yPos = margin;

      pdf.addImage(imgData, 'PNG', xPos, yPos, finalImgWidth, finalImgHeight);
      
      let MILS_TO_INCHES = 1/1000;
      let PIXELS_TO_INCHES = 1/96;

      const canvasHeightInInches = canvas.height * PIXELS_TO_INCHES / 2;
      let numPages = Math.ceil(canvasHeightInInches / contentHeight);
      console.log(`Canvas height: ${canvas.height}px, Estimated canvas height in inches: ${canvasHeightInInches}, Content height per page: ${contentHeight}, Estimated pages: ${numPages}`);

      pdf.save('ieee-paper.pdf');
      addNotification('PDF exported successfully!', 'success');
    } catch (error) {
      console.error("Error exporting PDF:", error);
      addNotification('Error exporting PDF. See console for details.', 'error');
    }
  };

  const handleSaveToFile = () => {
    const dataStr = JSON.stringify(paperData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ieee-paper.json';
    link.click();
    URL.revokeObjectURL(url);
    addNotification('Project saved to ieee-paper.json', 'success');
  };

  const handleLoadFromFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const jsonData = JSON.parse(text);
          // TODO: Add validation here to ensure jsonData conforms to PaperData structure
          onLoadFromFile(jsonData);
          addNotification('Project loaded successfully!', 'success');
        } catch (error) {
          console.error("Error loading or parsing file:", error);
          addNotification('Error loading file. Please ensure it is a valid JSON project file.', 'error');
        }
      };
      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
        addNotification('Error reading file.', 'error');
      };
      reader.readAsText(file);
      event.target.value = '';
    }
  };

  const isEditorActive = (style: string | { [key: string]: string }): boolean => !!activeEditor && activeEditor.isActive(style);
  const canSetTextAlign = (alignment: string) => !!activeEditor && activeEditor.can().setTextAlign(alignment);

  const toolbarButtonGroups: ButtonGroup[] = [
    {
      group: 'file',
      buttons: [
        { icon: Save, tooltip: 'Save Project to File', onClick: handleSaveToFile },
        { icon: FileUp, tooltip: 'Load Project from File', onClick: handleLoadFromFileClick },
        { icon: Trash2, tooltip: 'Clear Project', onClick: onClearProject },
        { icon: Download, tooltip: 'Export PDF', onClick: handleExportPDF },
        { icon: showPreview ? EyeOff : Eye, tooltip: showPreview ? 'Hide Preview' : 'Show Preview', onClick: onTogglePreview }
      ]
    },
    {
      group: 'format',
      buttons: [
        { icon: Bold, tooltip: 'Bold', onClick: () => activeEditor?.chain().focus().toggleBold().run(), disabled: !activeEditor?.can().toggleBold(), active: isEditorActive('bold') },
        { icon: Italic, tooltip: 'Italic', onClick: () => activeEditor?.chain().focus().toggleItalic().run(), disabled: !activeEditor?.can().toggleItalic(), active: isEditorActive('italic') },
        { icon: UnderlineIcon, tooltip: 'Underline', onClick: () => activeEditor?.chain().focus().toggleUnderline().run(), disabled: !activeEditor?.can().toggleUnderline(), active: isEditorActive('underline') }
      ]
    },
    {
      group: 'align',
      buttons: [
        { icon: AlignLeft, tooltip: 'Align Left', onClick: () => activeEditor?.chain().focus().setTextAlign('left').run(), disabled: !canSetTextAlign('left'), active: isEditorActive({ textAlign: 'left' }) },
        { icon: AlignCenter, tooltip: 'Align Center', onClick: () => activeEditor?.chain().focus().setTextAlign('center').run(), disabled: !canSetTextAlign('center'), active: isEditorActive({ textAlign: 'center' }) },
        { icon: AlignRight, tooltip: 'Align Right', onClick: () => activeEditor?.chain().focus().setTextAlign('right').run(), disabled: !canSetTextAlign('right'), active: isEditorActive({ textAlign: 'right' }) }
      ]
    },
    {
      group: 'insert',
      buttons: [
        { icon: ImageIcon, tooltip: 'Insert Image (handled by dedicated tab)', onClick: () => {}, disabled: true },
        { icon: TableIcon, tooltip: 'Insert Table (handled by dedicated tab)', onClick: () => {}, disabled: true },
        { icon: FileTextIcon, tooltip: 'Insert Reference (handled by rich text editor toolbar)', onClick: () => {}, disabled: true }
      ]
    },
    {
      group: 'edit',
      buttons: [
        { icon: Undo, tooltip: 'Undo', onClick: () => activeEditor?.chain().focus().undo().run(), disabled: !activeEditor?.can().undo() },
        { icon: Redo, tooltip: 'Redo', onClick: () => activeEditor?.chain().focus().redo().run(), disabled: !activeEditor?.can().redo() }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 border-b border-gray-200 px-4 py-2 sticky top-0 z-50">
      <input 
        type="file" 
        accept=".json,application/json" 
        ref={fileInputRef} 
        onChange={handleFileSelected} 
        style={{ display: 'none' }} 
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <h1 className="text-lg font-semibold text-gray-900 mr-4">IEEE Paper Editor</h1>
          
          {toolbarButtonGroups.map((group) => (
            <div key={group.group} className="flex items-center">
              {group.group !== 'file' && <div className="w-px h-6 bg-gray-200 mx-2" />}
              <div className="flex items-center space-x-1">
                {group.buttons.map((button, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    onClick={button.onClick}
                    className={`p-2 rounded transition-colors duration-150 ${
                      button.active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    } ${
                      button.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title={button.tooltip}
                    disabled={button.disabled ?? false}
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