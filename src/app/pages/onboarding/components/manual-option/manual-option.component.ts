import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manual-option',
  templateUrl: './manual-option.component.html',
  styleUrls: ['./manual-option.component.scss'],
  standalone: false
})
export class ManualOptionComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  
  // Indian states for dropdown
  indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  constructor() {}

  ngOnInit() {
    // Form is passed from parent component
  }

  // Helper method to get form control errors
  getErrorMessage(fieldName: string): string {
    const control = this.parentForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['pattern']) {
        return `Please enter a valid ${this.getFieldLabel(fieldName)}`;
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      restaurantName: 'Restaurant Name',
      ownerName: 'Owner Name',
      contactNumber: 'Contact Number',
      email: 'Email',
      address: 'Address',
      city: 'City',
      state: 'State',
      pincode: 'Pincode',
      gstNumber: 'GST Number',
      fssaiNumber: 'FSSAI Number',
      panNumber: 'PAN Number'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.parentForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  // Helper to auto-format GST number
  formatGSTNumber(event: any) {
    let value = event.target.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    if (value.length > 15) {
      value = value.substring(0, 15);
    }
    this.parentForm.patchValue({ gstNumber: value });
  }

  // Helper to auto-format PAN number
  formatPANNumber(event: any) {
    let value = event.target.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    this.parentForm.patchValue({ panNumber: value });
  }

  // Helper to allow only numbers for phone and pincode
  onlyNumbers(event: any, fieldName: string) {
    let value = event.target.value.replace(/[^0-9]/g, '');
    if (fieldName === 'contactNumber' && value.length > 10) {
      value = value.substring(0, 10);
    } else if (fieldName === 'pincode' && value.length > 6) {
      value = value.substring(0, 6);
    } else if (fieldName === 'fssaiNumber' && value.length > 14) {
      value = value.substring(0, 14);
    }
    this.parentForm.patchValue({ [fieldName]: value });
  }

  // Get current location using browser geolocation
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.parentForm.patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          alert(`Location captured! Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please ensure location services are enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
}
