import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { categories } from "~/utils/constants";
import { CategoryItem } from "~/components/pages/home/category-item";
import { SubCategoryItem } from "~/components/pages/home/subcategory-item";

export default function CategoriesScreen() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      contentContainerStyle={{
        padding: 16,
        paddingTop: Platform.OS === "ios" ? 60 : 20,
        paddingBottom: 20,
      }}
    >
      <View className="flex-row items-center justify-between mb-6 mt-10">
        <Text className="text-white text-2xl font-bold">Categories</Text>
        <TouchableOpacity
          onPress={() => setExpandedCategory(null)}
          className="bg-gray-800 rounded-lg px-3 py-1.5"
        >
          <Text className="text-gray-300 text-sm">Collapse all</Text>
        </TouchableOpacity>
      </View>

      {categories.map((category) => (
        <View key={category.id} className="mb-4">
          <CategoryItem
            item={category}
            isExpanded={expandedCategory === category.id}
            onPress={() =>
              setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )
            }
          />

          {expandedCategory === category.id && (
            <View className="ml-4 mt-2 space-y-2">
              {category.subCategories.map((subCategory) => (
                <SubCategoryItem key={subCategory.id} item={subCategory} />
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
