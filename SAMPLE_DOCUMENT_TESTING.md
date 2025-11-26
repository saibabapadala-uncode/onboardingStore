# Sample Document Feature - Testing Guide

## 🧪 Quick Start Testing

### Step 1: Convert HTML to PDF (One-time Setup)

Choose any method:

#### Method A: Browser (Fastest)
```bash
1. Navigate to: d:\OnpoardingStore\src\assets\sample-documents\
2. Double-click: sample-business-doc.html
3. Press: Ctrl+P (or Cmd+P on Mac)
4. Select: "Save as PDF"
5. Save as: sample-business-doc.pdf (in same folder)
```

#### Method B: Automated Script
```bash
cd src/assets/sample-documents
npm install puppeteer
node convert-to-pdf.js
```

#### Method C: Online Tool
```bash
1. Go to: https://html2pdf.com/
2. Upload: sample-business-doc.html
3. Download generated PDF
4. Rename to: sample-business-doc.pdf
5. Place in: src/assets/sample-documents/
```

### Step 2: Run the Application

```bash
npm start
```

Navigate to: `http://localhost:8100`

### Step 3: Test the Feature

## 📋 Testing Checklist

### Visual Verification

#### 1. Document Upload Tab
- [ ] Navigate to "Document Upload" tab
- [ ] Blue info banner is visible at the top
- [ ] Information icon is displayed
- [ ] Heading reads "Need Help? Download Sample Document"
- [ ] Description text is clear and readable
- [ ] Two buttons are visible: "Preview Sample" and "Download Sample"

#### 2. Preview Sample Button
- [ ] Click "Preview Sample" button
- [ ] Modal opens smoothly
- [ ] Modal has header with "Sample Business Document" title
- [ ] Close button (X) visible in top-right
- [ ] Loading spinner appears briefly
- [ ] Document renders in iframe
- [ ] Document is scrollable
- [ ] Footer has "Download Template" and "Close" buttons

#### 3. Download Sample Button
- [ ] Click "Download Sample" button (in banner)
- [ ] Browser download starts
- [ ] File downloads as "sample-business-doc.pdf"
- [ ] PDF opens correctly in PDF viewer

#### 4. Modal Interactions
- [ ] Click backdrop outside modal → Modal closes
- [ ] Click X button → Modal closes
- [ ] Click "Close" in footer → Modal closes
- [ ] Click "Download Template" in modal → PDF downloads
- [ ] All buttons have hover effects
- [ ] Loading state displays correctly

### Responsive Testing

#### Desktop (1920x1080)
- [ ] Modal is centered and sized correctly
- [ ] Buttons are side-by-side
- [ ] Document preview is clear

#### Tablet (768x1024)
- [ ] Banner layout adapts
- [ ] Modal still readable
- [ ] Buttons may stack

#### Mobile (375x667)
- [ ] Banner is readable
- [ ] Buttons stack vertically
- [ ] Modal is full-screen
- [ ] Text is legible

### Dark Mode Testing

#### Switch to Dark Mode
```typescript
// In browser console:
document.documentElement.classList.add('dark');
```

#### Verify:
- [ ] Blue banner background changes
- [ ] Text remains readable
- [ ] Icons are visible
- [ ] Buttons styled correctly
- [ ] Modal background adapts

### Error Handling

#### Simulate Missing PDF
1. Temporarily rename PDF file
2. Click "Preview Sample"
3. Verify:
   - [ ] Error message displays
   - [ ] Retry button appears
   - [ ] Download button still works
   - [ ] Fallback to HTML works

#### Test Network Issues
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Click "Preview Sample"
4. Verify:
   - [ ] Error message shows
   - [ ] User can still interact with page

### Integration Testing

#### Verify No Conflicts
- [ ] Can still upload regular documents
- [ ] File uploader works normally
- [ ] Document extraction still functions
- [ ] Form fields not affected
- [ ] Other tabs work normally
- [ ] Google Search tab functional
- [ ] Manual Entry tab functional

#### Upload Flow After Download
1. Click "Download Sample"
2. Fill the downloaded PDF (optional)
3. Upload filled PDF using file uploader
4. Verify:
   - [ ] File uploads successfully
   - [ ] File appears in uploaded files list
   - [ ] "Extract Information" button works
   - [ ] Form fields populate

### Browser Compatibility

Test in multiple browsers:

#### Chrome/Edge
- [ ] Modal opens correctly
- [ ] PDF preview works
- [ ] Download works

#### Firefox
- [ ] Modal opens correctly
- [ ] PDF preview works
- [ ] Download works

#### Safari
- [ ] Modal opens correctly
- [ ] PDF preview works
- [ ] Download works

### Mobile Device Testing

#### Android
1. Build APK or use browser
2. Test on physical device
3. Verify:
   - [ ] Buttons are tappable
   - [ ] Modal opens
   - [ ] Document preview works
   - [ ] Download saves to device
   - [ ] Back button closes modal

#### iOS
1. Build IPA or use Safari
2. Test on physical device
3. Verify:
   - [ ] Buttons are tappable
   - [ ] Modal opens
   - [ ] Document preview works
   - [ ] Download triggers share sheet
   - [ ] Close button works

## 🎯 Expected Behavior

### Preview Sample Flow
```
User clicks "Preview Sample"
    ↓
Loading spinner appears
    ↓
Modal opens (90% screen)
    ↓
Document loads in iframe
    ↓
User can scroll and view
    ↓
User can download from modal
    ↓
User closes modal
```

### Download Sample Flow
```
User clicks "Download Sample"
    ↓
Browser download starts
    ↓
PDF saves to Downloads folder
    ↓
User can open in PDF viewer
    ↓
User fills out template
    ↓
User uploads filled PDF
```

## 🐛 Common Issues & Solutions

### Issue 1: PDF Not Found (404)
**Symptom**: Error in console or blank iframe
**Solution**: 
- Ensure PDF exists at `src/assets/sample-documents/sample-business-doc.pdf`
- Rebuild application (`npm start`)

### Issue 2: Modal Not Opening
**Symptom**: Click does nothing
**Solution**:
- Check browser console for errors
- Verify ModalController is injected
- Ensure component is registered in module

### Issue 3: Download Not Working
**Symptom**: Nothing happens on click
**Solution**:
- Check browser's download settings
- Disable popup blockers
- Check file path is correct

### Issue 4: Iframe Not Displaying PDF
**Symptom**: Blank iframe or error
**Solution**:
- Convert HTML to PDF first
- Check browser PDF plugin enabled
- Try in different browser

### Issue 5: Dark Mode Not Working
**Symptom**: Colors don't change
**Solution**:
- Add `dark` class to `<html>` element
- Verify Tailwind dark mode configured
- Check CSS classes include dark: variants

## 📊 Success Criteria

✅ **Must Have:**
- Preview button opens modal
- Download button downloads PDF
- Modal displays document
- Modal can be closed
- Works on desktop and mobile
- No conflicts with existing upload

✅ **Should Have:**
- Smooth animations
- Loading states
- Error handling
- Dark mode support
- Responsive design

✅ **Nice to Have:**
- Fast load times
- Accessible keyboard navigation
- Screen reader support
- Print functionality

## 🔍 Console Logs to Monitor

When testing, watch for these logs:

```
✅ "Sample document download initiated"
✅ "Google Maps API loaded successfully"
❌ "Error downloading sample document:"
❌ "Error opening sample preview modal:"
```

## 📱 Capacitor Testing (Optional)

### Build for Android
```bash
ionic build
ionic cap sync android
ionic cap open android
```

### Build for iOS
```bash
ionic build
ionic cap sync ios
ionic cap open ios
```

## 🎉 Final Verification

Before marking as complete:

- [ ] All visual elements render correctly
- [ ] Both buttons work as expected
- [ ] Modal functionality is smooth
- [ ] Downloads work properly
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] Dark mode supported
- [ ] No conflicts with existing features
- [ ] Cross-browser compatible
- [ ] Mobile-friendly

---

## 📝 Test Report Template

```markdown
# Sample Document Feature Test Report

**Date**: ___________
**Tester**: ___________
**Browser**: ___________
**Device**: ___________

## Results

### Visual Tests
- [ ] PASS / [ ] FAIL - Blue banner displays
- [ ] PASS / [ ] FAIL - Buttons visible
- [ ] PASS / [ ] FAIL - Icons correct

### Functional Tests
- [ ] PASS / [ ] FAIL - Preview opens modal
- [ ] PASS / [ ] FAIL - Download works
- [ ] PASS / [ ] FAIL - Modal closes

### Integration Tests
- [ ] PASS / [ ] FAIL - No conflicts
- [ ] PASS / [ ] FAIL - Upload still works

### Notes:
_________________________
_________________________
_________________________
```

---

**Ready to Test!** 🚀

Follow this guide systematically and check off each item. Report any issues found during testing.
