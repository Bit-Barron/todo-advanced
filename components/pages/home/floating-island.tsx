import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
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

        <TouchableOpacity className="items-center">
          <MyDialog />
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
      </View>
    </View>
  );
};
