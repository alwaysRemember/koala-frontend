import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtIcon } from "taro-ui";
import { ICategoriesItem } from "../../interface";
import "./index.scss";

const Classification = ({
  categoriesList,
  showCategoriesMore
}: {
  categoriesList: Array<ICategoriesItem>;
  showCategoriesMore: boolean;
}) => {
  
  /**
   * 分类菜单点击
   * @param data
   */
  const menuClick = (data: ICategoriesItem) => {
    // TODO 菜单点击
  };
  return (
    <View className="classification-wrapper">
      {categoriesList &&
        categoriesList.map((item: ICategoriesItem) => (
          <View
            className="classification-item"
            key={item.id}
            onClick={() => menuClick(item)}
          >
            <AtAvatar
              size="small"
              circle
              image={item.categoriesIconUrl}
              className="icon"
            />
            <Text className="name">{item.categoriesName}</Text>
          </View>
        ))}

      {/* 是否显示更多分类项 */}
      {showCategoriesMore && (
        <View className="classification-item">
          <View className="icon">
            <AtIcon value="list" size="24" color="#fff" />
          </View>
          <Text
            className="name"
            onClick={() => {
              // TODO 更多点击
            }}
          >
            更多
          </Text>
        </View>
      )}
    </View>
  );
};

export default Classification;
