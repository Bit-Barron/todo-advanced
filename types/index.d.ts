export interface Todos {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  createdAt: string;
}
