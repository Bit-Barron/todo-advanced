import React, { useEffect, useState } from "react";
import { View, ScrollView, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { categories } from "~/utils/constants";
import { CategoryItem } from "~/components/pages/home/category-item";
import { SubCategoryItem } from "~/components/pages/home/subcategory-item";
import { MyDialog } from "~/components/elements/my-dialog";
import { createCategory, getAllCategories } from "~/db/db";

export default function CategoriesScreen() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");

  const createNewCategory = async () => {
    try {
      const response = await createCategory({
        name: category,
      });

      console.log(response);
      return response;
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  useEffect(() => {
    const response = getAllCategories().then((categories) => {
      console.log(categories);
    });
    console.log(response);
  }, []);

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
        <MyDialog
          dialogTrigger={"New Category"}
          dialogTitle={"Create new Category"}
          dialogDescription="Add new Category. Click save when you're done."
          action={createNewCategory}
          placeholder="Category"
          onChange={setCategory}
        />
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
                <>
                  <SubCategoryItem key={subCategory.id} item={subCategory} />
                </>
              ))}
              <MyDialog
                dialogTrigger={"New Subcategory"}
                dialogTitle={"Create new Subcategory"}
                dialogDescription="Add new Subcategory. Click save when you're done."
                action={createNewCategory}
                placeholder="Subcategory"
                onChange={setSubCategory}
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
