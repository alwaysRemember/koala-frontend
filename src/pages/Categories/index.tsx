import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtGrid } from 'taro-ui';
import styles from './index.module.scss';
import { ICategoriesItem } from './interface';
import { getCategoriesList } from '../../api';

const Categories = () => {
  const [data, setData] = useState<Array<ICategoriesItem>>([]);

  const getData = async () => {
    try {
      const data = await getCategoriesList();
      setData(data);
    } catch (e) {}
  };

  const categoriesClick = ({ name, id }: ICategoriesItem) => {
    // TODO 传入分类名至产品列表页面
    console.log(name, id);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View className={styles['categories-wrapper']}>
      <AtGrid
        onClick={categoriesClick}
        data={data.map(({ name, imgPath }) => ({
          image: imgPath,
          value: name,
        }))}
      />
    </View>
  );
};

export default Categories;
