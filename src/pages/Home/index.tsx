import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro';
import React from 'react';
import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Banner from './components/Banner';
import Classification from './components/Classification';
import styles from './index.module.scss';
import { IHomeData } from './interface';
import Featured from './components/Featured';
import HomeSkeleton from './components/HomeSkeleton';
import { getHomeInfo } from '../../api';
import SearchInput from '../../components/SearchInput';
import { showToast } from '../../utils/wxUtils';
import { loginPath } from '../../router';

const Home = () => {
  const [showPage, setShowPage] = useState<boolean>(false);
  const [data, setData] = useState<IHomeData>({
    bannerList: [],
    showCategoriesMore: true,
    categoriesList: [],
    featuredList: [],
  });

  const getData = async (isPullDownRefresh: boolean = false) => {
    try {
      const data = await getHomeInfo();
      setData(data);
      setShowPage(true);
    } catch (e) {}
    isPullDownRefresh && Taro.stopPullDownRefresh();
  };

  /**
   * 判断是否登录了
   * @param cb
   */
  const checkLogin = async (cb) => {
    try {
      // 校验session是否过期
      await Taro.checkSession();
      cb();
    } catch (e) {
      await showToast({
        title: '请登录',
      });
      Taro.navigateTo({
        url: loginPath(),
      });
    }
  };

  useDidShow(() => {
    getData();
  });

  usePullDownRefresh(() => {
    getData(true);
  });
  return (
    <View>
      {showPage ? (
        <View className={styles['home-wrapper']}>
          {/* 搜索 */}
          <View
            onClick={() => {
              checkLogin(() => {
                Taro.navigateTo({
                  url: '/pages/SearchPage/index',
                });
              });
            }}
          >
            <SearchInput isDisable={true} />
          </View>
          {/* banner */}
          <Banner bannerList={data.bannerList} checkLogin={checkLogin} />
          {/* 分类 */}
          <Classification
            showCategoriesMore={data.showCategoriesMore}
            categoriesList={data.categoriesList}
            checkLogin={checkLogin}
          />
          {/* 精选推荐 */}
          <Featured featuredList={data.featuredList} checkLogin={checkLogin} />
        </View>
      ) : (
        <HomeSkeleton />
      )}
    </View>
  );
};

export default Home;
