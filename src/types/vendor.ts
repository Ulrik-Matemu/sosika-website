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
  slug: string;
  shortDescription: string;
  fullDescription: string;
  serviceAreas: string[];
};

export type MenuItem = {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  isAvailable: boolean;
};

export type VendorWithMenuStats = Vendor & {
  menuStats: {
    minPrice: number | null;
    maxPrice: number | null;
    averagePrice: number | null;
    categories: string[];
    availableItemCount: number;
    sampleItems: {
      id: string;
      name: string;
      price: number;
      category: string;
    }[];
  };
};