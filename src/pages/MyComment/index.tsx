import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { AtAvatar, AtRate, AtLoadMore } from 'taro-ui';
import { View, ScrollView, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { getMyComment } from '../../api';
import { ICommentItem } from './interface';
import moment from 'moment';
import ImagePreload from '../../components/ImagePreload';
import { productDetailPath } from '../../router';

const MyComment = () => {
  const [total, setTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [list, setList] = useState<Array<ICommentItem>>([]);
  const [isGetData, setIsGetData] = useState<boolean>(false);

  const getData = async () => {
    setIsGetData(true);
    try {
      const { total, list: l } = await getMyComment({ page }, page === 1);
      setList(list.concat(l));
      setTotal(total);
    } catch (e) {}
    setIsGetData(false);
  };

  const onScrollToLower = () => {
    const p = page + 1;
    if (p > total || isGetData) return;
    setPage(p);
  };

  useEffect(() => {
    getData();
  }, [page]);
  return (
    <View className={styles['my-comment-wrapper']}>
      <ScrollView
        className={styles['my-comment-list']}
        scrollY
        onScrollToLower={onScrollToLower}
      >
        {list.map(
          ({
            id,
            rate,
            text,
            avatar,
            userName,
            createTime,
            product: { productId, url },
          }) => (
            <View className={styles['comment-item']} key={id}>
              <View className={styles['top']}>
                <View className={styles['user-info']}>
                  <AtAvatar circle image={avatar} />
                  <Text className={styles['name']}>{userName}</Text>
                </View>
                <Text className={styles['create-time']}>
                  {moment(createTime).format('YYYY-MM-DD hh:mm:ss')}
                </Text>
              </View>
              <AtRate value={rate} className={styles['rate']} />
              <Text className={styles['content']}>{text}</Text>
              <View
                className={styles['product']}
                onClick={() => {
                  Taro.navigateTo({
                    url: productDetailPath({
                      productId,
                    }),
                  });
                }}
              >
                <ImagePreload
                  width={180}
                  height={180}
                  borderRadius={14}
                  src={url}
                />
              </View>
            </View>
          ),
        )}
        {((page > 1 && isGetData) || (page === total && !isGetData)) && (
          <AtLoadMore status={(isGetData && 'loading') || 'noMore'} />
        )}
      </ScrollView>
    </View>
  );
};

export default MyComment;
