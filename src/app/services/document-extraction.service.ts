import { Injectable } from '@angular/core';
import { UploadedDocument } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentExtractionService {

  constructor() { }

  /**
   * Extracts data from uploaded documents
   * This is a stub implementation - in production, this would:
   * 1. Send documents to an OCR API (like Google Vision, AWS Textract, etc.)
   * 2. Parse the extracted text using NLP
   * 3. Return structured data
   */
  async extractDocumentData(documents: UploadedDocument[]): Promise<any> {
    // Simulate processing delay
    await this.delay(2000);

    // Stub extracted data
    const extractedData: any = {
      restaurantName: '',
      ownerName: '',
      contactNumber: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      fssaiNumber: '',
      panNumber: ''
    };

    // Simulate extraction based on document types
    for (const doc of documents) {
      if (doc.name.toLowerCase().includes('gst')) {
        extractedData.gstNumber = this.generateRandomGST();
        extractedData.restaurantName = 'Sample Restaurant Pvt Ltd';
        extractedData.address = '123, Main Street, Commercial Area';
      }
      
      if (doc.name.toLowerCase().includes('fssai')) {
        extractedData.fssaiNumber = this.generateRandomFSSAI();
        if (!extractedData.restaurantName) {
          extractedData.restaurantName = 'Food Service Business';
        }
      }
      
      if (doc.name.toLowerCase().includes('pan')) {
        extractedData.panNumber = this.generateRandomPAN();
        extractedData.ownerName = 'John Doe';
      }

      // Simulate extraction of common fields from any document
      if (!extractedData.contactNumber) {
        extractedData.contactNumber = '9876543210';
      }
      if (!extractedData.email) {
        extractedData.email = 'sample@restaurant.com';
      }
      if (!extractedData.city) {
        extractedData.city = 'Mumbai';
      }
      if (!extractedData.state) {
        extractedData.state = 'Maharashtra';
      }
      if (!extractedData.pincode) {
        extractedData.pincode = '400001';
      }
    }

    return extractedData;
  }

  /**
   * Validates GST number format
   */
  validateGSTNumber(gstNumber: string): boolean {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  }

  /**
   * Validates FSSAI number format
   */
  validateFSSAINumber(fssaiNumber: string): boolean {
    const fssaiRegex = /^[0-9]{14}$/;
    return fssaiRegex.test(fssaiNumber);
  }

  /**
   * Validates PAN number format
   */
  validatePANNumber(panNumber: string): boolean {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNumber);
  }

  /**
   * Process image using OCR (stub)
   * In production, this would integrate with services like:
   * - Google Cloud Vision API
   * - AWS Textract
   * - Azure Computer Vision
   * - Tesseract.js for client-side OCR
   */
  async processImageOCR(base64Image: string): Promise<string> {
    // Simulate OCR processing
    await this.delay(1000);
    
    // Return stub text
    return `
      Sample Restaurant Pvt Ltd
      GST No: 27AAAAA0000A1Z5
      FSSAI No: 12345678901234
      Address: 123, Main Street, Mumbai, Maharashtra - 400001
      Contact: 9876543210
      Email: sample@restaurant.com
    `;
  }

  /**
   * Extract structured data from text using NLP (stub)
   * In production, this could use:
   * - Regular expressions for pattern matching
   * - NLP libraries for entity extraction
   * - ML models for field classification
   */
  extractStructuredData(text: string): any {
    const data: any = {};

    // Extract GST number
    const gstMatch = text.match(/GST\s*(?:No|Number)?[\s:]*([A-Z0-9]{15})/i);
    if (gstMatch) {
      data.gstNumber = gstMatch[1];
    }

    // Extract FSSAI number
    const fssaiMatch = text.match(/FSSAI\s*(?:No|Number)?[\s:]*([0-9]{14})/i);
    if (fssaiMatch) {
      data.fssaiNumber = fssaiMatch[1];
    }

    // Extract PAN number
    const panMatch = text.match(/PAN\s*(?:No|Number)?[\s:]*([A-Z]{5}[0-9]{4}[A-Z]{1})/i);
    if (panMatch) {
      data.panNumber = panMatch[1];
    }

    // Extract email
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) {
      data.email = emailMatch[1];
    }

    // Extract phone number
    const phoneMatch = text.match(/(?:Ph|Phone|Mobile|Contact)[\s:]*([0-9]{10})/i);
    if (phoneMatch) {
      data.contactNumber = phoneMatch[1];
    }

    // Extract pincode
    const pincodeMatch = text.match(/(?:Pin|Pincode|Postal Code)[\s:]*([0-9]{6})/i);
    if (pincodeMatch) {
      data.pincode = pincodeMatch[1];
    }

    return data;
  }

  // Helper methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateRandomGST(): string {
    const states = ['27', '29', '22', '24', '33'];
    const state = states[Math.floor(Math.random() * states.length)];
    return `${state}AAAAA0000A1Z5`;
  }

  private generateRandomFSSAI(): string {
    return Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
  }

  private generateRandomPAN(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let pan = '';
    for (let i = 0; i < 5; i++) {
      pan += letters[Math.floor(Math.random() * 26)];
    }
    pan += Math.floor(1000 + Math.random() * 9000).toString();
    pan += letters[Math.floor(Math.random() * 26)];
    return pan;
  }
}
