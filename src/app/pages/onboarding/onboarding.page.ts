import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false
})
export class OnboardingPage implements OnInit {
  onboardingForm!: FormGroup;
  selectedSegment: string = 'google';
  selectionOptions = [
    { value: 'google', label: 'Google Search', icon: 'search-outline' },
    { value: 'upload', label: 'Document Upload', icon: 'document-outline' },
    { value: 'manual', label: 'Manual Entry', icon: 'create-outline' }
  ];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.onboardingForm = this.fb.group({
      restaurantName: ['', Validators.required],
      ownerName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      latitude: [null],
      longitude: [null],
      gstNumber: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
      fssaiNumber: ['', Validators.pattern('^[0-9]{14}$')],
      panNumber: ['', Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      uploadedDocs: [[]],
      // Additional fields from Google Places API
      website: [''],
      rating: [null],
      totalRatings: [null],
      googleMapsUrl: [''],
      openingHours: [[]],
      businessStatus: [''],
      placeTypes: [[]]
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async submitOnboarding() {
    if (this.onboardingForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Validation Error',
        message: 'Please fill in all required fields correctly.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Submitting your information...',
    });
    await loading.present();

    try {
      const restaurantData: Restaurant = this.onboardingForm.value;
      console.log('Restaurant Data:', restaurantData);
      
      // Here you would typically send this data to your backend
      // For now, we'll just log it and navigate
      
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Your restaurant has been successfully registered!',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }]
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'An error occurred while submitting your information. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  resetForm() {
    this.onboardingForm.reset();
    this.selectedSegment = 'google';
  }
}
