import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { SubCategory } from "~/types";

interface SubCategoryItemProps {
  item: SubCategory;
}

export const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ item }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-gray-700/50 rounded-xl p-3.5 mb-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <View className="bg-gray-600/50 rounded-lg p-2 mr-3">
        <MaterialIcons size={20} color="white" />
      </View>
      <Text className="text-white font-medium flex-1">{item.name}</Text>
    </TouchableOpacity>
  );
};
