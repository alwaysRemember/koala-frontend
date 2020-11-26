import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtGrid } from 'taro-ui';
import styles from './index.module.scss';
import { ICategoriesItem } from './interface';
import { getCategoriesList } from '../../api';
import { productListPagePath } from '../../router';

const Categories = () => {
  const [data, setData] = useState<Array<ICategoriesItem>>([]);

  const getData = async () => {
    try {
      const data = await getCategoriesList();
      setData(data);
    } catch (e) {}
  };

  const categoriesClick = ({ id, value }) => {
    Taro.navigateTo({
      url: productListPagePath({
        searchName: value,
        categoriesId: id,
      }),
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View className={styles['categories-wrapper']}>
      <AtGrid
        onClick={categoriesClick}
        data={data.map(({ name, imgPath, id }) => ({
          image: imgPath,
          value: name,
          id,
        }))}
      />
    </View>
  );
};

export default Categories;
