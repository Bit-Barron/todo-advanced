import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { AntDesign, Feather } from "@expo/vector-icons";
import { getAllTodos } from "~/db/db";
import { Priority } from "~/utils/constants";
import { MyDialog } from "~/components/pages/home/dialog";
import { TodoStore } from "../store/TodoStore";

export default function Screen() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const { todos, setTodos } = TodoStore();

  const toggleTask = (taskId: number) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const calculateProgress = () => {
    return Math.round((completedTasks.length / todos.length) * 100);
  };

  useEffect(() => {
    getAllTodos()
      .then((todos) => {
        setTodos(
          todos.map((todo) => ({
            ...todo,
            createdAt: todo.createdAt.toString(),
            priority: todo.priority as Priority["name"],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <ScrollView className="flex-1">
      <View className="px-6 pt-16 pb-20">
        <Text className="text-gray-400 text-lg">Hey, Barron</Text>
        <View className="mt-2 mb-6">
          <Text className="text-4xl font-bold text-white">
            Be Productive today
          </Text>
        </View>

        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Input
              className="bg-[#243B67] border-0 h-12 text-white"
              placeholder="Search"
            />
          </View>
          <AntDesign name="search1" size={25} className="mt-2" color="white" />
        </View>

        <View className="mb-8 bg-[#243B67] p-6 rounded-2xl">
          <Text className="text-white text-lg font-semibold mb-1">
            Task Progress
          </Text>
          <Text className="text-gray-400 text-sm mb-3">
            {completedTasks.length}/{todos.length} task done
          </Text>
          <View className="h-2 bg-[#2F497D] rounded-full overflow-hidden mb-2">
            <View
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            />
          </View>
          <Text className="text-gray-400 text-right text-sm">
            {calculateProgress()}% Complete
          </Text>
        </View>

        <View className="mb-6">
          <View className="flex flex-row justify-between">
            <Text className="text-white text-2xl font-semibold mb-4">
              Ongoing Tasks
            </Text>
            <Text className="text-white">see all</Text>
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

              return (
                <TouchableOpacity
                  key={task.id}
                  onPress={() => toggleTask(task.id)}
                  className={`flex-row justify-between items-center bg-[#243B67] p-4 rounded-xl ${
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
                        completedTasks.includes(task.id)
                          ? "text-gray-400 line-through"
                          : "text-white"
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
                  <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <MyDialog />
      </View>
    </ScrollView>
  );
}
