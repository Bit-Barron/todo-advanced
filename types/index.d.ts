export interface Todos {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  createdAt: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}
