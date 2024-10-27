// db.ts
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { todos } from "./schema";
import { sql } from "drizzle-orm";

// Create database connection
const sqlite = SQLite.openDatabaseSync("todos.db");
export const db = drizzle(sqlite);

// Todo erstellen
export const createTodo = async (
  title: string,
  priority: string = "medium",
  description?: string
) => {
  try {
    const result = await db.insert(todos).values({
      title,
      priority,
      description,
      completed: false,
    });
    return result;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Todos abrufen
export const getTodos = async () => {
  try {
    return await db.select().from(todos).all();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Todo aktualisieren
export const updateTodo = async (
  id: number,
  data: Partial<typeof todos.$inferSelect>
) => {
  try {
    return await db
      .update(todos)
      .set(data)
      .where(sql`id = ${id}`);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Todo löschen
export const deleteTodo = async (id: number) => {
  try {
    return await db.delete(todos).where(sql`id = ${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
