export interface Restaurant {
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

export interface UploadedDocument {
  name: string;
  type: string;
  url?: string;
  base64?: string;
}
