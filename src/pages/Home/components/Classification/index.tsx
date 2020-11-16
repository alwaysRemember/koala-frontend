import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import { ICategoriesItem } from '../../interface';
import styles from './index.module.scss';
import { categoriesPagePath } from '../../../../router';

const Classification = ({
  categoriesList,
  showCategoriesMore,
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
    <View className={styles['classification-wrapper']}>
      {categoriesList &&
        categoriesList.map((item: ICategoriesItem) => (
          <View
            className={styles['classification-item']}
            key={item.id}
            onClick={() => menuClick(item)}
          >
            <AtAvatar
              size="small"
              circle
              image={item.categoriesIconUrl}
              className={styles['icon']}
            />
            <Text className={styles['name']}>{item.categoriesName}</Text>
          </View>
        ))}

      {/* 是否显示更多分类项 */}
      {showCategoriesMore && (
        <View
          className={styles['classification-item']}
          onClick={() => {
            Taro.navigateTo({
              url: categoriesPagePath(),
            });
          }}
        >
          <View className={styles['icon']}>
            <AtIcon value="list" size="24" color="#fff" />
          </View>
          <Text className={styles['name']}>更多</Text>
        </View>
      )}
    </View>
  );
};

export default Classification;
