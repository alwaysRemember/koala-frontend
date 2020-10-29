import React, { useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtRate, AtTextarea, AtButton } from 'taro-ui';
import styles from './index.module.scss';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { ICommentItem, ICommentPagePathParams } from './interface';
import ImagePreload from '../../components/ImagePreload';
import { submitOrderComment } from '../../api';
import { showToast } from '../../utils/wxUtils';
import { updatePageChangeGetDataType } from '../../store/actions';

const CommentPage = () => {
  const {
    params: { orderId },
  } = useRouter<ICommentPagePathParams>();

  const {
    commentPageData: { productList },
  } = useMappedState<IReducers>((state) => state);

  const dispatch = useDispatch();

  const [commentList, setCommentList] = useState<Array<ICommentItem>>(
    productList.map((item) => ({
      ...item,
      rate: 5,
      text: '',
    })),
  );

  const [btnLoading, steBtnLoading] = useState<boolean>(false);

  const commentChange: <T>(
    value: T,
    productId: string,
    type: 'rate' | 'text',
  ) => void = (value, productId, type) => {
    setCommentList(
      commentList.map((item) => {
        if (item.productId === productId) {
          const clone = JSON.parse(JSON.stringify(item));
          clone[type] = value;
          return clone;
        } else {
          return item;
        }
      }),
    );
  };

  const submitComment = async () => {
    if (!orderId) {
      showToast({
        title: '未获取到订单ID',
      });
      return;
    }
    steBtnLoading(true);
    try {
      await submitOrderComment({
        orderId,
        productList: commentList.map(({ productId, rate, text }) => ({
          productId,
          rate,
          text,
        })),
      });
      dispatch(updatePageChangeGetDataType(true));
      Taro.navigateBack();
    } catch (e) {}
    steBtnLoading(false);
  };

  return (
    <View className={styles['comment-page-wrapper']}>
      {commentList.map(({ rate, text, img, name, productId }) => (
        <View className={styles['comment-item']}>
          <View className={styles['product-wrapper']}>
            <View className={styles['img']}>
              <ImagePreload
                src={img}
                width={180}
                height={180}
                borderRadius={14}
              />
            </View>
            <View className={styles['name-wrpaper']}>
              <Text className={styles['name']}>{name}</Text>
            </View>
          </View>
          <View className={styles['rate-wrapper']}>
            <Text className={styles['label']}>商品评分</Text>
            <AtRate
              className={styles['rate']}
              max={5}
              value={rate}
              size={18}
              onChange={(value) => {
                commentChange<number>(
                  (value as unknown) as number,
                  productId,
                  'rate',
                );
              }}
            />
          </View>
          <AtTextarea
            value={text}
            maxLength={200}
            placeholder="请输入您的商品评价,默认为系统好评信息"
            onChange={(value) => {
              commentChange<string>(value, productId, 'text');
            }}
          />
        </View>
      ))}
      <AtButton
        type="primary"
        full
        onClick={submitComment}
        loading={btnLoading}
      >
        提交评价信息
      </AtButton>
    </View>
  );
};

export default CommentPage;
