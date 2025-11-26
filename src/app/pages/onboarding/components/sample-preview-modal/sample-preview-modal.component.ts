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
  
  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    // Set the document URL - trying HTML first, then PDF if available
    const htmlPath = 'assets/sample-documents/sample-business-doc.html';
    const pdfPath = 'assets/sample-documents/sample-business-doc.pdf';
    
    // Try to use PDF first if available, fallback to HTML
    this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
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
    // Trigger download of the sample document
    const link = document.createElement('a');
    link.href = 'assets/sample-documents/sample-business-doc.pdf';
    link.download = 'sample-business-doc.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onIframeLoad() {
    this.isLoading = false;
    this.loadError = false;
  }

  onIframeError() {
    this.isLoading = false;
    this.loadError = true;
    
    // Fallback to HTML version
    const htmlPath = 'assets/sample-documents/sample-business-doc.html';
    this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(htmlPath);
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
