import { View, Text } from '@tarojs/components';
import { AtCard, AtRate } from 'taro-ui';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { getProductComment } from '../../api/product';
import { showToast } from '../../utils/wxUtils';
import moment from 'moment';
import styles from './index.module.scss';
import { IProductCommentItem, IProductCommentPathParams } from './interface';

const ProductComment = () => {
  const {
    params: { productId = '9fa9829a-d996-4811-b1f5-5c921ba899a5' },
  } = useRouter<IProductCommentPathParams>();
  const [data, setData] = useState<Array<IProductCommentItem>>([]);

  const getData = async () => {
    if (!productId) {
      showToast({
        title: '产品ID不存在',
      });
      return;
    }
    try {
      const { list } = await getProductComment({ productId });
      setData(list);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className={styles['product-comment-wrapper']}>
      {data.map(({ text, rate, avatar, userName, createTime }) => (
        <View className={styles['comment-item']}>
          <AtCard
            isFull
            title={userName}
            extra={moment(createTime).format('YYYY-MM-DD hh:mm')}
            thumb={avatar}
            className={styles['comment-content']}
          >
            <AtRate value={rate} />
            <Text className={styles['text']}>{text}</Text>
          </AtCard>
        </View>
      ))}
    </View>
  );
};
export default ProductComment;
