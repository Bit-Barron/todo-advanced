import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { Category } from "~/types";

interface CategoryItemProps {
  item: Category;
  isExpanded: boolean;
  onPress: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  isExpanded,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center rounded-2xl p-4 mb-3 ${
        isExpanded ? "bg-blue-600" : "bg-gray-800"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        className={`rounded-xl p-2.5 mr-4 ${
          isExpanded ? "bg-blue-500" : "bg-blue-600"
        }`}
      >
        <MaterialIcons size={24} color="white" />
      </View>
      <View className="flex-1">
        <Text className="text-white text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-200 text-sm mt-1 opacity-80">
          {item.subCategories.length}{" "}
          {item.subCategories.length === 1
            ? "Unterkategorie"
            : "Unterkategorien"}
        </Text>
      </View>
      <MaterialIcons
        name={isExpanded ? "chevron-right" : "keyboard-arrow-right"}
        size={24}
        color="white"
        style={{
          transform: [{ rotate: isExpanded ? "90deg" : "0deg" }],
        }}
      />
    </TouchableOpacity>
  );
};
