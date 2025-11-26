# Quick Start Guide - Restaurant Onboarding App

## 🚀 Get Started in 3 Steps

### Step 1: Add Your Google Maps API Key
Edit `src/index.html` line 22:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places"></script>
```

**Get an API Key:** https://console.cloud.google.com/google/maps-apis/

**Enable these APIs:**
- Maps JavaScript API
- Places API

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the App
```bash
ionic serve
```
or
```bash
ng serve
```

## 📱 Features

### 1. Google Search Auto-Fill
- Type restaurant name
- Select from autocomplete suggestions
- Auto-fills: name, address, city, state, pincode, coordinates

### 2. Document Upload
- Upload business documents (PDF, images)
- Stub extraction service (ready for real implementation)
- Manual form editing after upload

### 3. Manual Entry
- Complete form with validation
- Indian states dropdown
- GST, FSSAI, PAN number formatting
- Geolocation support

## 🔧 All Fixed Issues

✅ Google Maps TypeScript errors
✅ Standalone component errors  
✅ FormControl type errors
✅ Tailwind CSS import errors

## 📂 Project Structure

```
src/app/
├── models/
│   └── restaurant.model.ts          # Restaurant & Document interfaces
├── pages/
│   └── onboarding/
│       ├── onboarding.page.ts       # Main page with unified FormGroup
│       ├── onboarding.page.html     # Ionic segments UI
│       └── components/
│           ├── google-option/       # Google Places integration
│           ├── upload-option/       # Document upload
│           └── manual-option/       # Manual form entry
└── services/
    └── document-extraction.service.ts  # Document processing (stub)
```

## 🎯 Form Architecture

- **Unified FormGroup** shared across all 3 tabs
- **Child components** receive `[parentForm]` as Input
- **formControlName** directive for type-safe binding
- **Reactive Forms** with validation

## 🌐 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Next Steps

1. Replace stub document extraction with real OCR service
2. Add backend API integration for form submission
3. Implement file upload to cloud storage
4. Add more validation rules as needed
5. Customize Flowbite/Ionic styling

## 🆘 Troubleshooting

**Google Maps not loading?**
- Check API key is valid
- Verify APIs are enabled in Google Cloud Console
- Check browser console for errors

**TypeScript errors?**
- Run: `rd /s /q .angular` (Windows) or `rm -rf .angular` (Mac/Linux)
- Restart dev server

**Module not found?**
- Run: `npm install`
- Check node_modules folder exists

## 📚 Documentation

- [Angular](https://angular.io/docs)
- [Ionic](https://ionicframework.com/docs)
- [Google Maps Places API](https://developers.google.com/maps/documentation/javascript/places)
- [Flowbite](https://flowbite.com/docs/getting-started/introduction/)

---

**Ready to go!** 🎉
