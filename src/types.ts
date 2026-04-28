export type Role = "ADMIN" | "CREATOR" | "PARTNER" | "RESEARCHER";
export type Gender = "FEMALE" | "MALE" | "NON_BINARY" | "PREFER_NOT_TO_SAY";
export type BusinessScale =
  | "INDIVIDUAL"
  | "MICRO"
  | "SMALL"
  | "MEDIUM"
  | "COOPERATIVE";
export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
 
export interface Sector {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  description: string | null;
  icon: string | null;
  isIfcd: boolean;
  order: number;
}
 
export interface Province {
  id: string;
  code: string;
  name: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
}
 
export interface City {
  id: string;
  code: string;
  name: string;
  type: string;
  provinceId: string;
  latitude: number | null;
  longitude: number | null;
}
 
export interface CreatorProfile {
  id: string;
  userId: string;
  fullName: string;
  slug: string;
  bio: string | null;
  avatarUrl: string | null;
  coverImageUrl: string | null;
 
  gender: Gender | null;
  birthYear: number | null;
  isYouth: boolean;
  isIndigenous: boolean;
  ethnicGroup: string | null;
  hasDisability: boolean;
 
  sectorId: string;
  subSector: string | null;
  tags: string | null;
 
  businessName: string | null;
  businessScale: BusinessScale;
  yearStarted: number | null;
  isFormallyRegistered: boolean;
  legalEntity: string | null;
  monthlyRevenueIDR: number | null;
 
  provinceId: string;
  cityId: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
 
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
  spotify: string | null;
  whatsapp: string | null;
 
  verificationStatus: VerificationStatus;
  isPublic: boolean;
  consentToShare: boolean;
}
 
export interface CreatorWithRelations extends CreatorProfile {
  sector: Sector;
  province: Province;
  city: City;
  works?: Work[];
}
 
export interface Work {
  id: string;
  creatorId: string;
  title: string;
  description: string | null;
  year: number | null;
  imageUrl: string | null;
  externalUrl: string | null;
}
 
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  level: CourseLevel;
  durationMin: number | null;
  language: string;
  sectorId: string | null;
  forWomen: boolean;
  forYouth: boolean;
  forIndigenous: boolean;
  isPublished: boolean;
  publishedAt: Date | null;
}
 
export interface CourseWithRelations extends Course {
  sector: Sector | null;
  modules: CourseModule[];
  enrollmentCount: number;
}
 
export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  contentMd: string;
  videoUrl: string | null;
  order: number;
}
 
export interface ImpactMetric {
  id: string;
  date: Date;
  metric: string;
  value: number;
  category: string | null;
  notes: string | null;
}
 
export interface Testimonial {
  id: string;
  authorId: string | null;
  authorName: string;
  authorRole: string | null;
  quote: string;
  imageUrl: string | null;
  isPublished: boolean;
}
 
export interface CreatorFilters {
  sectorSlug?: string;
  provinceCode?: string;
  gender?: Gender;
  isYouth?: boolean;
  isIndigenous?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}