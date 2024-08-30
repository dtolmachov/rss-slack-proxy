import { Category } from './category.enum';

export interface GrowthEventDto {
  title: string;
  link: string;
  category: Category;
  date: string;
  description?: string;
  location?: string;
}
