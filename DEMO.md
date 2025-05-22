# 🎯 IEEE Paper Editor - Demo & Features

## ✅ **LATEST FIXES** (Simplified Reference System)

### **NEW APPROACH: Separate Media Management + Reference Insertion**
✅ **MUCH SIMPLER**: No more full media in content editor
✅ **CLEAN SEPARATION**: Upload images in "Images" tab, create tables in "Tables" tab
✅ **REFERENCE INSERTION**: Insert simple references like `[Fig. 1]` or `[Table I]` in content
✅ **AUTOMATIC NUMBERING**: References auto-increment based on existing media count

### **How It Works:**
1. **Images Tab** → Upload and manage all images (creates figure library)
2. **Tables Tab** → Create and manage all tables (creates table library)  
3. **Content Editor** → Insert references: 📷 button adds `[Fig. 1]`, 📊 button adds `[Table I]`
4. **Preview Mode** → Shows full images and tables with proper IEEE positioning

### **Benefits:**
✅ **No cluttered content editor** - just clean text with references
✅ **Proper IEEE workflow** - like LaTeX with \ref{fig:label}
✅ **Easier management** - all media in dedicated tabs
✅ **Better performance** - content editor loads faster
✅ **IEEE compliant** - references show as [Fig. 1], [Table I] format

## 🖥️ **Editor Interface Overview**

### **Main Navigation Tabs:**
```
[Content] [Title] [Authors] [Abstract] [Images] [Tables] [References] [👁️ Preview]
```

### **Rich Text Toolbar (NEW):**
```
[B] [I] [•] [1.] ["] [</>] [📷] [📊] 
Bold, Italic, Lists, Quote, Code, Insert Fig Ref, Insert Table Ref
```

### **Sidebar (Left):**
- Section navigation
- Add/remove sections  
- Drag & drop to reorder sections
- Section counter

### **Main Editor Area:**
- Rich text editor with formatting toolbar
- Live content editing
- Section title editing
- **NEW**: Simple reference insertion (no full media)

### **Toolbar (Top):**
- Save project (JSON format)
- Export to PDF
- Toggle preview mode

## 📝 **NEW Simplified Workflow**

### **1. Paper Setup**
```
Title Tab → Enter paper title
Authors Tab → Add author info (name, affiliation, email)
Abstract Tab → Write abstract + add keywords
```

### **2. Media Creation**
```
Images Tab → Upload images
- Drag & drop files
- Add captions
- Images automatically numbered (Fig. 1, Fig. 2...)

Tables Tab → Create tables  
- Add rows/columns
- Edit content
- Tables automatically numbered (Table I, Table II...)
```

### **3. Content Writing with References**
```
Content Tab → Write your sections
- Normal text editing with formatting
- Click 📷 button to insert [Fig. 1] references  
- Click 📊 button to insert [Table I] references
- References automatically use next available number
```

### **4. References**
```
References Tab → Add citations
- Standard IEEE reference format
- Automatic numbering [1], [2], [3]...
```

### **5. Preview & Export**
```
👁️ Preview → See complete IEEE format
- Text with inline references
- Images positioned properly  
- Tables formatted correctly
- Full IEEE double-column layout
```

## 🎨 **IEEE Formatting Features**

### **Automatic Formatting:**
- ✅ Double-column layout (IEEE standard)
- ✅ Proper margins (0.75" all around)
- ✅ Column gap (0.25")
- ✅ Times New Roman font
- ✅ Correct font sizes for all elements
- ✅ Section numbering (A, B, C...)
- ✅ Figure numbering (Fig. 1, Fig. 2...)
- ✅ Table numbering (Table I, Table II...)
- ✅ Reference formatting ([1], [2], [3]...)

### **Typography:**
- **Title**: 24px, bold, centered
- **Authors**: 12px, centered, with affiliations
- **Abstract**: 9px, single column
- **Body Text**: 10px, justified
- **Section Headers**: 10px, bold, uppercase
- **Captions**: 8px, italic, centered

## 🔧 **Rich Text Editor Features**

### **Formatting Options:**
- **Bold** (Ctrl+B)
- *Italic* (Ctrl+I)
- Bullet lists
- Numbered lists
- Blockquotes
- Code blocks

### **NEW Reference Insertion:**
- **📷 Insert Figure Reference**: Adds `[Fig. 1]` at cursor
- **📊 Insert Table Reference**: Adds `[Table I]` at cursor
- **Auto-numbering**: Based on existing media count
- **Clean text**: No embedded images/tables in content

## 📊 **Example Workflow**

### **Step 1: Create Media**
```
Images Tab:
- Upload image1.png → becomes "Fig. 1"
- Upload image2.png → becomes "Fig. 2"

Tables Tab:  
- Create data table → becomes "Table I"
- Create results table → becomes "Table II"
```

### **Step 2: Write Content with References**
```
Content Editor:
"The results shown in [Fig. 1] demonstrate the effectiveness 
of our approach. Table I presents the performance metrics..."

- [Fig. 1] inserted with 📷 button
- [Table I] inserted with 📊 button
```

### **Step 3: Preview**
```
IEEE Preview:
- Shows full images where referenced
- Shows complete tables in proper format
- All positioned according to IEEE standards
```

## 🚀 **Getting Started**

1. **Install Node.js** from https://nodejs.org/
2. **Run setup commands:**
   ```bash
   npm install
   npm run dev
   ```
3. **Open http://localhost:3000**
4. **Upload media first** - Images and Tables tabs
5. **Write content** - Use reference buttons for media
6. **Preview** - See full IEEE formatting
7. **Export** - PDF or save as JSON

## 🎯 **Key Advantages of New System**

1. ✅ **Cleaner Content Editor** - No visual clutter from embedded media
2. ✅ **Better Organization** - All media managed in dedicated tabs  
3. ✅ **Faster Performance** - Content editor loads instantly
4. ✅ **IEEE Workflow** - Matches academic paper writing conventions
5. ✅ **Easier Reference Management** - Auto-numbered, easy to insert
6. ✅ **Professional Output** - Preview shows proper IEEE positioning

**This simplified approach makes the editor much more usable and follows standard academic writing patterns!** 