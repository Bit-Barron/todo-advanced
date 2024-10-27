import { create } from "zustand";
import { Todos } from "~/types";

interface TodoStore {
  todos: Todos[];
  setTodos: (todos: Todos[]) => void;
}

export const TodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
}));
