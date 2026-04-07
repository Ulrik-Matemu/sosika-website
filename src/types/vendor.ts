export type Vendor = {
  id: string;
  name: string;
  ownerName: string;
  coverImageUrl: string;
  averageRating: number;
  ratingCount: number;
  isOpen: boolean;
  collegeId: number | null;
  geolocation: {
    lat: number | null;
    lng: number | null;
  };
};