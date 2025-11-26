import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sample-preview-modal',
  templateUrl: './sample-preview-modal.component.html',
  styleUrls: ['./sample-preview-modal.component.scss'],
  standalone: false
})
export class SamplePreviewModalComponent implements OnInit {
  documentUrl: SafeResourceUrl;
  isLoading = true;
  loadError = false;
  
  /**
   * Get absolute URL for assets - works in both local and production
   */
  private getAssetUrl(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Get base href from document
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    
    // Construct full URL
    const origin = window.location.origin;
    const fullPath = baseHref.endsWith('/') ? baseHref + cleanPath : baseHref + '/' + cleanPath;
    
    return origin + fullPath;
  }
  
  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    // Use HTML version since PDF needs to be generated
    // Use proper asset URL that works in both local and production
    const htmlPath = this.getAssetUrl('assets/sample-documents/sample-business-doc.html');
    this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(htmlPath);
    console.log('Sample document URL:', htmlPath);
  }

  ngOnInit() {
    // Document will load in iframe
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  downloadDocument() {
    // Open HTML in new tab for printing to PDF
    const htmlUrl = this.getAssetUrl('assets/sample-documents/sample-business-doc.html');
    const opened = window.open(htmlUrl, '_blank');
    
    if (!opened) {
      alert('Please allow pop-ups for this site to download the sample document.');
      return;
    }
    
    // Show instruction to user
    setTimeout(() => {
      alert('To download as PDF: Press Ctrl+P (or Cmd+P on Mac) in the opened tab and select "Save as PDF"');
    }, 500);
  }

  onIframeLoad() {
    this.isLoading = false;
    this.loadError = false;
  }

  onIframeError() {
    this.isLoading = false;
    this.loadError = true;
    console.error('Error loading sample document');
  }

  retryLoad() {
    this.isLoading = true;
    this.loadError = false;
    
    // Reset the iframe by changing the URL
    const currentUrl = this.documentUrl;
    this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
    
    setTimeout(() => {
      this.documentUrl = currentUrl;
    }, 100);
  }
}
