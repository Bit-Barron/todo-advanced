import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { priorities, Priority } from "~/utils/constants";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { createTodo, getAllTodos } from "~/db/db";
import { TodoStore } from "~/store/TodoStore";
import { Ionicons } from "@expo/vector-icons";

export function MyDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setTodos } = TodoStore();
  const [priority, setPriority] = useState<Priority["name"]>("Medium");

  const handleNewTodo = async () => {
    try {
      await createTodo({
        title,
        description,
        priority,
      });

      const updatedTodos = await getAllTodos();
      setTodos(
        updatedTodos.map((todo) => ({
          ...todo,
          createdAt: todo.createdAt.toString(),
          priority: todo.priority as Priority["name"],
        }))
      );
      setTitle("");
      setDescription("");
      setPriority("Medium");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Dialog className="bg-blue-600 p-4 rounded-full -mt-8">
      <DialogTrigger asChild>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Todo</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add new Todo. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Input value={title} onChangeText={setTitle} placeholder="Todo Title" />
        <Textarea
          value={description}
          onChangeText={setDescription}
          placeholder="Todo Description"
        />
        <View className="flex-row justify-around items-center mt-4">
          {priorities.map((p) => {
            return (
              <TouchableOpacity
                key={p.name}
                onPress={() => setPriority(p.name)}
              >
                <View className={`${p.color} px-4 py-2 rounded-full`}>
                  <Text className="text-white text-center">{p.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={handleNewTodo}>
              <Text className="text-white">Submit</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
