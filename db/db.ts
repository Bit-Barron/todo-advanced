import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { todos } from "./schema";
import { eq } from "drizzle-orm";

const expo = openDatabaseSync("db.db");
export const db = drizzle(expo);

export async function getAllTodos() {
  try {
    return await db.select().from(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function createTodo({
  title,
  priority = "medium",
  description,
}: {
  title: string;
  priority: string;
  description: string;
}) {
  try {
    const response = await db.insert(todos).values({
      title,
      priority,
      description,
      completed: false,
      createdAt: new Date(),
    });

    console.log("new todo backend", response);

    return response;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

export async function updateTodo(
  id: number,
  data: Partial<typeof todos.$inferSelect>
) {
  try {
    return await db.update(todos).set(data).where(eq(todos.id, id));
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    return await db.delete(todos).where(eq(todos.id, id));
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}