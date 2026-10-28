export type ProductCategory = 'materials' | 'furniture' | 'equipment';

export type ZoneType = 'pool' | 'bbq' | 'patio' | 'terrace' | 'pathways';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  specs: ProductSpec[];
  zones: ZoneType[];
  price: string;
  badge?: string;
  dimensions?: string;
}

export interface SolutionHotspot {
  id: string;
  productId: string;
  x: number; // Percentage from left (0 - 100)
  y: number; // Percentage from top (0 - 100)
  label: string;
}

export interface SolutionMeta {
  area: string;
  style: string;
  timeline: string;
}

export interface Solution {
  id: string;
  name: string;
  zoneType: ZoneType;
  subtitle: string;
  concept: string;
  description: string;
  heroImage: string;
  gallery: string[];
  productIds: string[];
  hotspots?: SolutionHotspot[];
  meta: SolutionMeta;
  badge?: string;
}

export type InquiryType = 'design' | 'product' | 'solution' | 'general';

export interface InquiryFormData {
  type: InquiryType;
  name: string;
  phone: string;
  comment?: string;
  areaSize?: string;
  productId?: string;
  productName?: string;
  solutionId?: string;
  solutionName?: string;
}

export interface InquiryRecord extends InquiryFormData {
  id: string;
  createdAt: string;
}
