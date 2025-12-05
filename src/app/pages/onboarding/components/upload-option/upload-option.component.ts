import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DocumentExtractionService } from '../../../../services/document-extraction.service';
import { UploadedDocument } from '../../../../models/restaurant.model';
import { SamplePreviewModalComponent } from '../sample-preview-modal/sample-preview-modal.component';

@Component({
  selector: 'app-upload-option',
  templateUrl: './upload-option.component.html',
  styleUrls: ['./upload-option.component.scss'],
  standalone: false
})
export class UploadOptionComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  
  uploadedFiles: UploadedDocument[] = [];
  isProcessing = false;
  extractionResults: any = null;
  supportedFormats = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
  
  constructor(
    private documentService: DocumentExtractionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Initialize with existing uploaded docs if any
    const existingDocs = this.parentForm.get('uploadedDocs')?.value;
    if (existingDocs && existingDocs.length > 0) {
      this.uploadedFiles = existingDocs;
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!this.supportedFormats.includes(fileExtension)) {
        alert(`File ${file.name} is not supported. Please upload: ${this.supportedFormats.join(', ')}`);
        continue;
      }

      // Read file and convert to base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const uploadedDoc: UploadedDocument = {
          name: file.name,
          type: file.type,
          base64: e.target.result
        };
        this.uploadedFiles.push(uploadedDoc);
        this.updateFormWithDocs();
      };
      reader.readAsDataURL(file);
    }
  }

  async processDocuments() {
    if (this.uploadedFiles.length === 0) {
      alert('Please upload at least one document to process');
      return;
    }

    this.isProcessing = true;
    
    try {
      // Process documents through extraction service
      const extractedData = await this.documentService.extractDocumentData(this.uploadedFiles);
      this.extractionResults = extractedData;
      
      // Auto-fill form with extracted data
      this.fillFormWithExtractedData(extractedData);
      
      this.isProcessing = false;
    } catch (error) {
      console.error('Error processing documents:', error);
      this.isProcessing = false;
      alert('Error processing documents. Please try again or use manual entry.');
    }
  }

  fillFormWithExtractedData(data: any) {
    // This would be populated based on the actual extraction results
    // For now, using stub data
    if (data.restaurantName) {
      this.parentForm.patchValue({ restaurantName: data.restaurantName });
    }
    if (data.ownerName) {
      this.parentForm.patchValue({ ownerName: data.ownerName });
    }
    if (data.contactNumber) {
      this.parentForm.patchValue({ contactNumber: data.contactNumber });
    }
    if (data.email) {
      this.parentForm.patchValue({ email: data.email });
    }
    if (data.address) {
      this.parentForm.patchValue({ address: data.address });
    }
    if (data.city) {
      this.parentForm.patchValue({ city: data.city });
    }
    if (data.state) {
      this.parentForm.patchValue({ state: data.state });
    }
    if (data.pincode) {
      this.parentForm.patchValue({ pincode: data.pincode });
    }
    if (data.gstNumber) {
      this.parentForm.patchValue({ gstNumber: data.gstNumber });
    }
    if (data.fssaiNumber) {
      this.parentForm.patchValue({ fssaiNumber: data.fssaiNumber });
    }
    if (data.panNumber) {
      this.parentForm.patchValue({ panNumber: data.panNumber });
    }
    if (data.website) {
      this.parentForm.patchValue({ website: data.website });
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.updateFormWithDocs();
  }

  updateFormWithDocs() {
    this.parentForm.patchValue({
      uploadedDocs: this.uploadedFiles
    });
  }

  getFileIcon(fileType: string): string {
    if (fileType.includes('pdf')) return 'document-text';
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('doc')) return 'document';
    return 'document-attach';
  }

  formatFileSize(base64: string): string {
    // Rough estimation of file size from base64 string
    const sizeInBytes = base64.length * 0.75;
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB > 1024) {
      return (sizeInKB / 1024).toFixed(2) + ' MB';
    }
    return sizeInKB.toFixed(2) + ' KB';
  }

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

  /**
   * Download sample business document template
   */
  downloadSampleDocument() {
    try {
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
      
      console.log('Sample document opened for download');
    } catch (error) {
      console.error('Error opening sample document:', error);
      alert('Unable to open the sample document. Please try again.');
    }
  }

  /**
   * Open modal to preview sample business document
   */
  async previewSampleDocument() {
    try {
      const modal = await this.modalController.create({
        component: SamplePreviewModalComponent,
        cssClass: 'sample-preview-modal',
        backdropDismiss: true
      });

      await modal.present();
    } catch (error) {
      console.error('Error opening sample preview modal:', error);
      alert('Unable to open preview. You can still download the sample document.');
    }
  }
}
