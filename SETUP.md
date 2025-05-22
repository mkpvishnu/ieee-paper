# Quick Setup Guide for IEEE Paper Editor

## ⚡ Quick Start (Windows)

### Step 1: Install Node.js
1. Go to **https://nodejs.org/**
2. Click **"Download for Windows"** (LTS version recommended)
3. Run the downloaded installer (.msi file)
4. Follow the installation wizard (accept all defaults)
5. Restart your command prompt/PowerShell

### Step 2: Verify Installation
Open PowerShell or Command Prompt and run:
```bash
node --version
npm --version
```
You should see version numbers (e.g., v18.17.0 and 9.6.7)

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start the Application
```bash
npm run dev
```

### Step 5: Open in Browser
- The app will automatically open at **http://localhost:3000**
- If it doesn't open automatically, click the link in the terminal

## 🎯 First Time Usage

1. **Start with Title**: Click the "Title" tab and enter your paper title
2. **Add Authors**: Click "Authors" tab and add author information  
3. **Write Abstract**: Use "Abstract" tab for your abstract and keywords
4. **Add Content**: Use the sidebar to create and edit sections
5. **Insert Media**: Use "Images" and "Tables" tabs to add figures and tables
6. **Add References**: Use "References" tab for bibliography
7. **Preview**: Click the eye icon to see IEEE-formatted output

## 🚨 Troubleshooting

### Node.js Not Found
- Make sure you downloaded from the official site: https://nodejs.org/
- Restart your terminal after installation
- Try running as administrator

### Installation Fails
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Application Won't Load
- Check that no antivirus is blocking the app
- Try a different browser
- Disable browser extensions temporarily

## 📱 Browser Requirements
- Chrome 90+ (recommended)
- Firefox 88+
- Edge 90+
- Safari 14+

## 🔧 Development Mode vs Production

**Development Mode** (what you're running):
- Hot reload (changes appear instantly)
- Debug tools available
- Runs on localhost:3000

**Production Build**:
```bash
npm run build
npm run preview
```

## 💡 Tips for Best Experience

1. **Auto-save**: Your work is automatically saved as you type
2. **Keyboard Shortcuts**: 
   - Ctrl+B = Bold
   - Ctrl+I = Italic
   - Ctrl+S = Save
3. **Export Options**: Use the toolbar to save or export your paper
4. **Preview Mode**: Toggle to see exactly how your paper will look in IEEE format

## 📞 Need Help?

1. Check the main README.md file
2. Ensure all steps above were completed
3. Try restarting your computer if installation issues persist
4. Check Windows Defender/antivirus settings if the app won't start 