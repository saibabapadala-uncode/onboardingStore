# 🚀 Quick Start - Sample Document Feature

## ⚡ 3-Step Setup (10 minutes)

### Step 1: Convert HTML to PDF (5 min)
```bash
# Navigate to folder
cd src/assets/sample-documents

# Open HTML in browser
start sample-business-doc.html  # Windows
# OR
open sample-business-doc.html   # Mac

# Print to PDF
Press Ctrl+P → Save as PDF → Name: sample-business-doc.pdf
```

### Step 2: Start App (2 min)
```bash
npm start
```

### Step 3: Test (3 min)
```
1. Go to: http://localhost:8100
2. Click: "Document Upload" tab
3. See blue banner at top
4. Click: "Preview Sample" → Modal opens ✅
5. Click: "Download Sample" → PDF downloads ✅
```

---

## 📍 Where to Find It

**Location**: Document Upload Tab → Top of page (above file uploader)

**UI Elements**:
- 🔵 Blue info banner
- ℹ️ Information icon
- 📋 "Need Help? Download Sample Document" heading
- 👁️ "Preview Sample" button
- ⬇️ "Download Sample" button

---

## 🎯 What It Does

1. **Preview Sample**: Opens modal with document preview
2. **Download Sample**: Downloads PDF template directly
3. **User fills template**: Offline with business details
4. **User uploads filled PDF**: Using existing uploader
5. **System extracts data**: Auto-fills form (existing feature)

---

## 📁 Key Files

```
Created:
✅ src/assets/sample-documents/sample-business-doc.html
✅ src/app/pages/.../sample-preview-modal/ (component)

Modified:
✅ src/app/pages/.../upload-option/ (component)
✅ src/app/pages/onboarding/onboarding.module.ts
✅ src/global.scss
```

---

## ✅ Verification Checklist

- [ ] PDF exists at: `src/assets/sample-documents/sample-business-doc.pdf`
- [ ] Blue banner visible in Document Upload tab
- [ ] "Preview Sample" button opens modal
- [ ] "Download Sample" button downloads PDF
- [ ] Modal displays document correctly
- [ ] Modal can be closed
- [ ] No errors in console

---

## 🐛 Quick Troubleshooting

**Problem**: Blank preview
**Fix**: Convert HTML to PDF first

**Problem**: Download doesn't work
**Fix**: Check file exists, disable popup blocker

**Problem**: Modal doesn't open
**Fix**: Check console for errors, verify module registration

---

## 📊 Sample Document Contains

1. Restaurant Name
2. Owner Name
3. Contact Number
4. Email
5. Address (City, State, Pincode)
6. GST Number
7. FSSAI Number
8. PAN Number
9. Additional fields
10. Signature section

---

## 🎨 Styling

- **Framework**: Flowbite + Tailwind CSS + Ionic
- **Theme**: Blue color scheme
- **Dark Mode**: ✅ Supported
- **Responsive**: ✅ Mobile-friendly
- **Icons**: Ionicons

---

## 💻 Code Reference

### Methods Added (upload-option.component.ts)
```typescript
downloadSampleDocument()   // Downloads PDF
previewSampleDocument()    // Opens modal
```

### Component Created
```typescript
SamplePreviewModalComponent  // Preview modal
```

---

## 📚 Full Documentation

- **Complete Guide**: `SAMPLE_DOCUMENT_FEATURE.md`
- **Testing Guide**: `SAMPLE_DOCUMENT_TESTING.md`
- **Implementation Summary**: `SAMPLE_DOCUMENT_IMPLEMENTATION_SUMMARY.md`

---

## 🎉 You're Done!

Feature is ready to use after PDF conversion. Users can now:
- Preview the sample document
- Download and fill it
- Upload it for auto-extraction

**Total Setup Time**: ~10 minutes
**User Benefit**: Clear guidance on required information

---

**Need Help?** Check the comprehensive docs or test using the testing guide! 🚀
