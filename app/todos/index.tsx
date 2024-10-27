import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TodoStore } from "~/store/TodoStore";
import { deleteTodo, updateTodo } from "~/db/db";

export default function Screen() {
  const { todos, setTodos } = TodoStore();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setCompletedTasks((prev) => prev.filter((taskId) => taskId !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleCompleteTask = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const newCompletedState = !todo.completed;

    updateTodo({
      id,
      completed: newCompletedState,
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: newCompletedState } : todo
          )
        );
        if (newCompletedState) {
          setCompletedTasks((prev) => [...prev, id]);
        } else {
          setCompletedTasks((prev) => prev.filter((taskId) => taskId !== id));
        }
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <View className="mt-10 p-3">
      <View className="flex flex-row justify-between">
        <Text className="text-white ml-4 text-2xl font-semibold mb-4">
          Current Todos
        </Text>
      </View>
      <View>
        {todos.map((task, index) => {
          let background = "white";
          switch (task.priority) {
            case "High":
              background = "bg-red-600";
              break;
            case "Medium":
              background = "bg-yellow-600";
              break;
            case "Low":
              background = "bg-green-600";
              break;
            default:
              background = "bg-yellow-600";
          }

          const isCompleted = completedTasks.includes(task.id);

          return (
            <TouchableOpacity
              key={task.id}
              className={`flex-row justify-between items-center bg-cardColor p-4 rounded-xl ${
                index !== 0 ? "mt-3" : ""
              }`}
              activeOpacity={0.7}
            >
              <View className="ml-4">
                <Text
                  className={`text-white rounded-full w-20 text-center ${background}`}
                >
                  {task.priority}
                </Text>
                <Text
                  className={`text-lg ${
                    isCompleted ? "text-gray-400 line-through" : "text-white"
                  }`}
                >
                  {task.title}
                </Text>
                <Text className="text-gray-400">{task.description}</Text>
                <View className="flex flex-row gap-2 mt-4">
                  <Text className="text-gray-400">Created:</Text>
                  <Text className="text-white">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleDeleteTodo(task.id)}>
                  <Entypo name="trash" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCompleteTask(task.id)}
                  className="mt-6"
                >
                  {isCompleted ? (
                    <AntDesign name="close" size={24} color="white" />
                  ) : (
                    <AntDesign name="check" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
