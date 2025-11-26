# Restaurant Onboarding System

## 🚀 Features

This Angular + Ionic + Flowbite onboarding system provides a comprehensive solution for restaurant registration with three input methods:

1. **Google Search Auto-Fill** - Search for your restaurant using Google Places API
2. **Document Upload** - Upload business documents for automatic data extraction
3. **Manual Entry** - Enter all details manually with validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Ionic CLI (`npm install -g @ionic/cli`)
- Google Maps API Key (for Google Places functionality)

## 🛠️ Installation

1. Install Tailwind CSS dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npm install flowbite
```

2. The project already has the necessary dependencies in package.json:
   - @googlemaps/js-api-loader
   - @types/google.maps
   - flowbite

## ⚙️ Configuration

### Google Maps API Setup

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API

3. Update the API key in `google-option.component.ts`:
```typescript
this.googleLoader = new Loader({
  apiKey: 'YOUR_API_KEY', // Replace with your actual API key
  version: 'weekly',
  libraries: ['places']
});
```

### Tailwind CSS Setup

The project includes a `tailwind.config.js` file. If you encounter any build issues with Tailwind, run:
```bash
npx tailwindcss init
```

## 🏃‍♂️ Running the Application

1. Start the development server:
```bash
ionic serve
```
or
```bash
ng serve
```

2. Navigate to `http://localhost:8100` (Ionic) or `http://localhost:4200` (Angular)

## 📱 Features Overview

### Unified Form Architecture
- Single FormGroup (`onboardingForm`) manages all data across three input methods
- Child components receive parent form via `@Input()` and patch values
- Clean separation of concerns with dedicated components

### Restaurant Model
```typescript
interface Restaurant {
  restaurantName: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  gstNumber: string;
  fssaiNumber: string;
  panNumber: string;
  uploadedDocs: UploadedDocument[];
}
```

### Input Methods

#### 1. Google Search Option
- Real-time autocomplete using Google Places API
- Automatic extraction of:
  - Restaurant name
  - Address components (street, city, state, pincode)
  - GPS coordinates
  - Phone number (if available)

#### 2. Document Upload Option
- Supports multiple file formats: PDF, DOC, DOCX, JPG, PNG
- Stub extraction service (ready for OCR integration)
- Visual file management with preview and delete
- Automatic form population from extracted data

#### 3. Manual Entry Option
- Comprehensive form with validation
- Indian state dropdown
- Format helpers for GST, PAN, FSSAI numbers
- Browser geolocation for GPS coordinates
- Real-time validation feedback

## 🎨 UI Components

### Flowbite Integration
- Modern, responsive form inputs
- Clean card layouts
- Professional styling with Tailwind utilities

### Ionic Components
- Segment buttons for tab navigation
- Loading indicators
- Alert dialogs
- Icons throughout the interface

## 📝 Form Validation

- Required fields: Restaurant name, Owner name, Contact, Email, Address, City, State, Pincode
- Pattern validation:
  - Contact: 10-digit Indian mobile number
  - Email: Standard email format
  - Pincode: 6-digit Indian pincode
  - GST: 15-character alphanumeric format
  - FSSAI: 14-digit number
  - PAN: 10-character alphanumeric format

## 🔌 Service Integration

### Document Extraction Service
Currently provides stub implementation. Ready for integration with:
- Google Cloud Vision API
- AWS Textract
- Azure Computer Vision
- Tesseract.js (client-side OCR)

## 📊 Data Output

Access the complete form data using:
```typescript
const restaurantData: Restaurant = this.onboardingForm.value;
```

## 🚨 Important Notes

1. **API Keys**: Never commit API keys to version control. Use environment variables.
2. **CORS**: Ensure your backend APIs have proper CORS configuration.
3. **File Size**: Document uploads are limited to 10MB by default.
4. **Browser Support**: Geolocation requires HTTPS in production.

## 🔧 Customization

- Modify validation patterns in `onboarding.page.ts`
- Update supported file types in `upload-option.component.ts`
- Customize state list in `manual-option.component.ts`
- Adjust styling in component SCSS files

## 📄 License

This project is part of the OnboardingStore application.
