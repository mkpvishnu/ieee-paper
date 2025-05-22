# IEEE Paper Editor

A modern, user-friendly React application for creating IEEE double-column format papers without the complexity of LaTeX. This editor provides a WYSIWYG interface for academic paper writing with proper IEEE formatting.

## Features

### 📝 **Complete Paper Management**
- **Title & Author Management**: Easy-to-use forms for paper metadata
- **Abstract & Keywords**: Dedicated editor with word count and keyword management
- **Section Management**: Drag-and-drop section reordering with rich text editing
- **References**: Comprehensive reference manager with proper IEEE citation formatting (manual input)

### 🎨 **Rich Text Editing**
- **WYSIWYG Editor**: Powered by TipTap with full formatting capabilities
- **Tables**: Reference-based table insertion with a dedicated builder and IEEE formatting
- **Images**: Reference-based image insertion with drag-and-drop uploader and caption management
- **Mathematical Equations**: (Planned) Support for mathematical notation
- **Links**: URL and cross-reference management (basic link support)

### 📄 **IEEE Formatting**
- **Double Column Layout**: Automatic IEEE-compliant two-column formatting
- **Proper Typography**: IEEE-standard fonts, sizes, and spacing
- **Section Numbering**: Automatic section and subsection numbering
- **Figure & Table Captions**: Properly formatted captions with automatic numbering
- **Reference Formatting**: IEEE-standard reference formatting

### 🔧 **User Experience**
- **Live Preview**: Real-time IEEE format preview
- **Drag & Drop**: Intuitive section and element management
- **Auto-save**: Automatic saving of work in progress
- **Export Options**: PDF export with perfect IEEE formatting
- **Responsive Design**: Works on desktop and tablet devices

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Installation & Setup

1. **Install Node.js**
   ```bash
   # Download and install Node.js from https://nodejs.org/
   # Verify installation:
   node --version
   npm --version
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   - The application will automatically open in your browser
   - Default URL: http://localhost:3000

## Usage Guide

### Getting Started
1. **Start with Title**: Click on the "Title" tab to enter your paper title
2. **Add Authors**: Use the "Authors" tab to add author information
3. **Write Abstract**: Create your abstract and add keywords
4. **Create Content**: Use the sidebar to add and organize sections
5. **Preview**: Toggle preview mode to see the IEEE-formatted output

### Section Management
- **Add Sections**: Click the "+" button in the sidebar
- **Reorder Sections**: Drag sections up/down in the sidebar
- **Edit Content**: Click on a section to edit its content
- **Delete Sections**: Use the trash icon to remove sections

### Rich Text Features
- **Bold/Italic**: Use toolbar buttons or Ctrl+B/Ctrl+I
- **Lists**: Create bulleted or numbered lists
- **Tables**: Insert tables with proper IEEE formatting
- **Images**: Drag images into the editor or use the insert button
- **Links**: Add hyperlinks and cross-references

### References
- **Add References**: Use the "References" tab
- **IEEE Format**: References are automatically formatted according to IEEE standards
- **Citation**: References are automatically numbered and can be cited in text

### Export Options
- **Save Project**: Download your work as a JSON file
- **Export PDF**: Generate a properly formatted IEEE paper PDF
- **Print**: Use browser print for additional output options

## Project Structure

```
ieee-paper-editor/
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main application component
│   │   ├── Toolbar.tsx     # Formatting toolbar
│   │   ├── Sidebar.tsx     # Section navigation
│   │   ├── PaperEditor.tsx # Main editor component
│   │   ├── PaperPreview.tsx # IEEE format preview
│   │   ├── RichTextEditor.tsx # TipTap editor wrapper
│   │   ├── TitleEditor.tsx  # Title editing component
│   │   ├── AuthorEditor.tsx # Author management
│   │   ├── AbstractEditor.tsx # Abstract & keywords
│   │   └── ReferenceManager.tsx # Reference management
│   ├── types/
│   │   └── paper.ts        # TypeScript type definitions
│   ├── index.css          # Global styles with IEEE formatting
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom IEEE styles
- **Rich Text Editor**: TipTap
- **Drag & Drop**: React DnD (for section reordering)
- **PDF Export**: jsPDF + html2canvas
- **Icons**: Lucide React

## IEEE Compliance

This editor follows IEEE paper formatting guidelines:
- 8.5" × 11" page size with 0.75" margins
- Two-column layout with 0.25" column gap
- Times New Roman font family
- Proper heading hierarchy and numbering
- IEEE-standard reference formatting
- Figure and table caption formatting

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for academic or commercial purposes.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all dependencies are properly installed
3. Verify Node.js version compatibility
4. Clear browser cache if experiencing issues

## Future Enhancements

- [ ] Real-time collaboration
- [ ] Advanced equation editor (e.g., using KaTeX or MathJax)
- [ ] Template library
- [ ] Citation import from databases (e.g., BibTeX)
- [ ] Plagiarism checking integration
- [ ] Version history
- [ ] Comments and annotations
- [ ] Advanced chart creation tools (e.g., using Recharts or similar)
- [ ] Automated reference formatting from DOI or metadata
- [ ] Enhanced table editing capabilities
- [ ] More robust cross-referencing features 