import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { MyDialog } from "./dialog";
import { useRouter } from "expo-router";

export const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 w-full bg-cardColor rounded-t-3xl shadow-lg"
    >
      <View className="flex-row justify-around items-center py-4">
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="items-center"
        >
          <AntDesign name="home" size={24} color="white" />
          <Text className="text-white text-xs mt-1">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/todos")}
          className="items-center"
        >
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={24}
            color="white"
          />
          <Text className="text-white text-xs mt-1">Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="bg-blue-500 p-4 rounded-full -mt-8">
            <MyDialog />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/categories")}
          className="items-center"
        >
          <MaterialCommunityIcons
            name="format-list-group"
            size={24}
            color="white"
          />
          <Text className="text-white text-xs mt-1">Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="stats-chart" size={24} color="white" />
          <Text className="text-white text-xs mt-1">Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
