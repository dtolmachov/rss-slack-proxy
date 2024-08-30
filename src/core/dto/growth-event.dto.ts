import Category from "./category.enum";

interface GrowthEventDto {
  title: string;
  link: string;
  category: Category;
  date: string;
  description?: string;
  location?: string;
}

export default GrowthEventDto;
