# Sample Business Document

## Converting HTML to PDF

The sample document is provided as an HTML file. To convert it to PDF:

### Option 1: Using Browser (Easiest)
1. Open `sample-business-doc.html` in your browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Select "Save as PDF" as the printer
4. Save as `sample-business-doc.pdf`

### Option 2: Online Tools
- Use https://html2pdf.com/
- Upload the HTML file
- Download the generated PDF

### Option 3: Using Command Line (Node.js)
```bash
npm install -g html-pdf-node
html-pdf sample-business-doc.html sample-business-doc.pdf
```

### Option 4: Use Existing PDF
Simply replace this file with your own sample business document PDF named `sample-business-doc.pdf`

## File Location
Place the final PDF at: `src/assets/sample-documents/sample-business-doc.pdf`

The application will automatically serve this file for download and preview.
