import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../../environments/environment';

// Declare global google object
declare const google: any;

@Component({
  selector: 'app-google-option',
  templateUrl: './google-option.component.html',
  styleUrls: ['./google-option.component.scss'],
  standalone: false
})
export class GoogleOptionComponent implements OnInit, AfterViewInit {
  @Input() parentForm!: FormGroup;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  autocomplete!: google.maps.places.Autocomplete;
  placeDetails: google.maps.places.PlaceResult | null = null;
  isLoading = false;
  private loader: Loader;
  private googleMapsLoaded = false;

  constructor() {
    // Initialize Google Maps Loader with API key from environment
    this.loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['places']
    });
  }

  ngOnInit() {
    // Form is passed from parent
    this.loadGoogleMaps();
  }

  ngAfterViewInit() {
    // Wait for Google Maps to load before initializing autocomplete
    if (this.googleMapsLoaded) {
      this.initAutocomplete();
    }
  }

  async loadGoogleMaps() {
    try {
      await this.loader.load();
      this.googleMapsLoaded = true;
      console.log('Google Maps API loaded successfully');
      
      // Initialize autocomplete if view is ready
      if (this.searchInput) {
        this.initAutocomplete();
      }
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
    }
  }

  initAutocomplete() {
    // Ensure Google Maps script is loaded
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
      console.error('Google Maps script not loaded');
      setTimeout(() => this.initAutocomplete(), 500);
      return;
    }

    try {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.searchInput.nativeElement,
        {
          types: ['establishment'],
          componentRestrictions: { country: ['us', 'in'] }, // US and India
          fields: [
            'name',
            'formatted_address',
            'geometry',
            'address_components',
            'formatted_phone_number',
            'website',
            'place_id'
          ]
        }
      );

      this.autocomplete.addListener('place_changed', () => {
        this.handlePlaceSelect();
      });
    } catch (error) {
      console.error('Error initializing Autocomplete:', error);
    }
  }

  handlePlaceSelect() {
    const place = this.autocomplete.getPlace();
    
    if (!place.geometry) {
      console.error('No details available for the selected place');
      return;
    }

    this.placeDetails = place;
    this.fillFormWithPlaceDetails(place);
  }

  fillFormWithPlaceDetails(place: google.maps.places.PlaceResult) {
    // Extract address components with better handling
    let streetNumber = '';
    let route = '';
    let sublocality = '';
    let city = '';
    let state = '';
    let pincode = '';
    let country = '';

    if (place.address_components) {
      for (const component of place.address_components) {
        const types = component.types;
        
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        }
        if (types.includes('route')) {
          route = component.long_name;
        }
        if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
          sublocality = component.long_name;
        }
        if (types.includes('locality')) {
          city = component.long_name;
        }
        if (types.includes('administrative_area_level_2') && !city) {
          city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
        if (types.includes('postal_code')) {
          pincode = component.long_name;
        }
        if (types.includes('country')) {
          country = component.long_name;
        }
      }
    }

    // Build complete street address
    let streetAddress = '';
    if (streetNumber) streetAddress += streetNumber + ' ';
    if (route) streetAddress += route;
    if (sublocality && !streetAddress.includes(sublocality)) {
      streetAddress += (streetAddress ? ', ' : '') + sublocality;
    }

    // Fallback to formatted address if components are missing
    const finalAddress = streetAddress.trim() || place.formatted_address || '';

    // Patch the form with extracted values
    const formValues: any = {
      restaurantName: place.name || '',
      address: finalAddress,
      latitude: place.geometry?.location?.lat() || null,
      longitude: place.geometry?.location?.lng() || null
    };

    // Only update if we have valid data
    if (city) formValues.city = city;
    if (state) formValues.state = state;
    if (pincode) formValues.pincode = pincode;

    this.parentForm.patchValue(formValues);

    // Extract and clean phone number
    if (place.formatted_phone_number) {
      const cleanedPhone = place.formatted_phone_number.replace(/\D/g, '');
      if (cleanedPhone.length >= 10) {
        this.parentForm.patchValue({
          contactNumber: cleanedPhone.slice(-10)
        });
      }
    }

    // Log successful extraction for debugging
    console.log('Place details extracted:', {
      name: place.name,
      address: finalAddress,
      city,
      state,
      pincode,
      phone: place.formatted_phone_number,
      location: {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng()
      }
    });
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this.placeDetails = null;
  }

  async searchManually() {
    const searchValue = this.searchInput.nativeElement.value;
    if (!searchValue) {
      alert('Please enter a restaurant name to search');
      return;
    }

    // Ensure Google Maps is loaded
    if (!this.googleMapsLoaded) {
      alert('Google Maps is still loading. Please wait a moment...');
      await this.loadGoogleMaps();
      return;
    }

    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
      console.error('Google Maps script not loaded');
      alert('Unable to connect to Google Maps. Please refresh the page.');
      return;
    }

    this.isLoading = true;
    
    try {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      
      const request: google.maps.places.TextSearchRequest = {
        query: searchValue + ' restaurant'
      };

      service.textSearch(
        request,
        (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
          this.isLoading = false;
          
          if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const placeId = results[0].place_id;
            
            if (placeId) {
              // Fetch detailed information
              const detailsRequest: google.maps.places.PlaceDetailsRequest = {
                placeId: placeId,
                fields: [
                  'name',
                  'formatted_address',
                  'geometry',
                  'address_components',
                  'formatted_phone_number',
                  'website',
                  'place_id'
                ]
              };
              
              service.getDetails(
                detailsRequest,
                (place: google.maps.places.PlaceResult | null, detailStatus: google.maps.places.PlacesServiceStatus) => {
                  if (detailStatus === google.maps.places.PlacesServiceStatus.OK && place) {
                    this.placeDetails = place;
                    this.fillFormWithPlaceDetails(place);
                  } else {
                    alert('Could not retrieve full details for this location. Please try again.');
                  }
                }
              );
            }
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            alert('No results found for "' + searchValue + '". Please try a different search term.');
          } else {
            alert('Search failed. Please try again or use manual entry.');
            console.error('Search status:', status);
          }
        }
      );
    } catch (error) {
      this.isLoading = false;
      console.error('Search error:', error);
      alert('An error occurred during search. Please try again.');
    }
  }
}
