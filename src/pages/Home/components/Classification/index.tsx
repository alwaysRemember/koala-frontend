import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import { ICategoriesItem } from '../../interface';
import styles from './index.module.scss';
import { categoriesPagePath, productListPagePath } from '../../../../router';

const Classification = ({
  categoriesList,
  showCategoriesMore,
  checkLogin,
}: {
  categoriesList: Array<ICategoriesItem>;
  showCategoriesMore: boolean;
  checkLogin: (cb) => void;
}) => {
  /**
   * 分类菜单点击
   * @param data
   */
  const menuClick = ({ id, categoriesName }: ICategoriesItem) => {
    Taro.navigateTo({
      url: productListPagePath({
        searchName: categoriesName,
        categoriesId: id,
      }),
    });
  };
  return (
    <View className={styles['classification-wrapper']}>
      {categoriesList &&
        categoriesList.map((item: ICategoriesItem) => (
          <View
            className={styles['classification-item']}
            key={item.id}
            onClick={() => {
              checkLogin(() => {
                menuClick(item);
              });
            }}
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
