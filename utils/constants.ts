export const ONGOING = [
  {
    id: 1,
    title: "Finish Homework",
  },
  {
    id: 2,
    title: "Do Laundry",
  },
  {
    id: 3,
    title: "Clean Room",
  },
  {
    id: 4,
    title: "Go to the gym",
  },
] as const;

export type Priority = "High" | "Medium" | "Low";
