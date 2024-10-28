import { Category } from "~/types";

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

export const categories: Category[] = [
  {
    id: 1,
    name: "Schule",
    subCategories: [
      {
        id: 1,
        name: "Deutsch",
      },
      {
        id: 2,
        name: "Mathe",
      },
      {
        id: 3,
        name: "Englisch",
      },
    ],
  },
  {
    id: 2,
    name: "Freizeit",
    subCategories: [
      {
        id: 4,
        name: "Sport",
      },
      {
        id: 5,
        name: "Lesen",
      },
      {
        id: 6,
        name: "Gaming",
      },
    ],
  },
  {
    id: 3,
    name: "Sonstiges",
    subCategories: [
      {
        id: 7,
        name: "Einkaufen",
      },
      {
        id: 8,
        name: "Rechnungen",
      },
      {
        id: 9,
        name: "Arzt",
      },
    ],
  },
];
