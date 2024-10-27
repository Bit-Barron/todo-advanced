export interface Priority {
  name: "High" | "Medium" | "Low";
  color: string;
}

export const priorities: Priority[] = [
  {
    name: "High",
    color: "bg-red-600",
  },
  {
    name: "Medium",
    color: "bg-yellow-600",
  },
  {
    name: "Low",
    color: "bg-green-600",
  },
];
