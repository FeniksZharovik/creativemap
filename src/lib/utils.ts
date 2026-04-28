import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}
 
export function formatIDR(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}
 
export function calculateAge(birthYear: number | null | undefined): number | null {
  if (!birthYear) return null;
  const current = new Date().getFullYear();
  return current - birthYear;
}
 
export function isYouthAge(birthYear: number | null | undefined): boolean {
  const age = calculateAge(birthYear);
  if (age === null) return false;
  return age >= 18 && age <= 30;
}
 
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}