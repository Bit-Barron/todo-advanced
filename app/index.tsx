import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { ONGOING } from "~/utils/constants";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { MyDropdownMenu } from "~/components/pages/home/dropdown";
import { createTodo } from "~/db/db";

export default function Screen() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [message, setMessage] = useState("");

  const toggleTask = (taskId: number) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const calculateProgress = () => {
    return Math.round((completedTasks.length / ONGOING.length) * 100);
  };

  const handleNewTodo = () => {};

  return (
    <ScrollView className="flex-1 ">
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
              className="bg-[#243B67] border-0 h-12 text-white "
              placeholder="Search"
            />
          </View>
          <Button>
            <AntDesign name="search1" size={20} color="#182842" />
          </Button>
        </View>

        <View className="mb-8 bg-[#243B67] p-6 rounded-2xl">
          <Text className="text-white text-lg font-semibold mb-1">
            Task Progress
          </Text>
          <Text className="text-gray-400 text-sm mb-3">30/40 task done</Text>
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
              Ongoing
            </Text>
            <Text className="text-white">see all</Text>
          </View>
          <View>
            {ONGOING.map((task, index) => (
              <TouchableOpacity
                key={task.id}
                onPress={() => toggleTask(task.id)}
                className={`flex-row justify-between items-center bg-[#243B67] p-4 rounded-xl ${
                  index !== 0 ? "mt-3" : ""
                }`}
                activeOpacity={0.7}
              >
                <View className="ml-4">
                  <Text className="bg-red-600 rounded-full text-center w-16">
                    High
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
                  <Text className="text-gray-400">10:00 AM - 06:00 PM</Text>
                  <View className="flex flex-row gap-2 mt-4">
                    <Text className="text-gray-400">Due Date:</Text>
                    <Text>Augost 25</Text>
                  </View>
                </View>
                <View
                  className={`w-6 h-6 rounded-full justify-center items-center border-2 ${
                    completedTasks.includes(task.id)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {completedTasks.includes(task.id) && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Text>New Todo</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new Todo</DialogTitle>
              <DialogDescription>
                Add new Todo. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Input className="" placeholder="Todo Title" />
            <Textarea className="mt-4" placeholder="Todo Description" />
            <MyDropdownMenu />
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </ScrollView>
  );
}
