export interface CategoryDefinition {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortNameAr: string;
  descriptionAr: string;
  metaTitle: string;
  metaDescription: string;
  iconName: string;
  subcategories: string[];
  relatedCategorySlugs: string[];
}
