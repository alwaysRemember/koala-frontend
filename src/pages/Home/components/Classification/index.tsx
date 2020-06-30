import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtIcon } from "taro-ui";
import { IClassificationItem } from "../../interface";
import "./index.sass";

const Classification = ({
  classificationList,
  showClassificationMore
}: {
  classificationList: Array<IClassificationItem>;
  showClassificationMore: boolean;
}) => {
  /**
   * 分类菜单点击
   * @param data
   */
  const menuClick = (data: IClassificationItem) => {
    // TODO 菜单点击
  };
  return (
    <View className="classification-wrapper">
      {classificationList &&
        classificationList.map((item: IClassificationItem) => (
          <View
            className="classification-item"
            key={item.id}
            onClick={() => menuClick(item)}
          >
            <AtAvatar
              size="small"
              circle
              image={item.imgUrl}
              className="icon"
            />
            <Text className="name">{item.name}</Text>
          </View>
        ))}

      {/* 是否显示更多分类项 */}
      {showClassificationMore && (
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
