import React, { useMemo, useState } from 'react';
import { AtList, AtListItem, AtInput } from 'taro-ui';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { IAddressItem } from '../AddressList/interface';
import { getDefaultShoppingAddress } from '../../api';
import styles from './index.module.scss';
import { setClassName, transferAmount } from '../../utils';
import { addressListPath, addShoppingAddressPath } from '../../router';
import { EAddressListPathSource } from '../AddressList/enums';
import { EPageSource, EPageType } from '../AddShoppingAddress/enums';
import ImagePreload from '../../components/ImagePreload';
import { IBuyProductItem } from './interface';

const OrderConfirm = () => {
  const state = useMappedState<IReducers>((state) => state);

  const [selectShoppingAddress, setSelectShoppingAddress] = useState<
    IAddressItem
  >(); // 选择的收货地址

  const [buyProductList, setBuyProductList] = useState<Array<IBuyProductItem>>(
    state.orderConfirmProductList.map((data) =>
      Object.assign({}, data, {
        remarks: '',
      }),
    ),
  ); // 购买的产品数据

  const [shoppingAddressLength, setShoppingAddressLength] = useState<number>(); // 当前用户收货地址条数

  // 获取默认收货地址
  const getDefaultAddress = async () => {
    try {
      const {
        defaultAddress,
        addressLength,
      } = await getDefaultShoppingAddress();

      setShoppingAddressLength(addressLength);
      // 存在默认收货地址并且当前未选择收货地址
      if (defaultAddress && !state.shoppingAddress) {
        setSelectShoppingAddress(defaultAddress);
      }
    } catch (e) {}
  };

  // 收货地址点击
  const shoppingAddressClick = () => {
    let url: string;
    if (shoppingAddressLength) {
      // 有收货地址但是没有选择默认的地址
      url = addressListPath({
        source: EAddressListPathSource.ORDER_CONFIRM,
      });
    } else {
      // 没有创建过收货地址
      url = addShoppingAddressPath({
        type: EPageType.ADD,
        source: EPageSource.ORDER_CONFIRM,
      });
    }
    Taro.navigateTo({
      url,
    });
  };

  useDidShow(() => {
    if (state.shoppingAddress) {
      setSelectShoppingAddress(state.shoppingAddress);
    }
    getDefaultAddress();
  });
  return (
    <View className={styles['order-confirm-wrapper']}>
      {/* 收货地址 */}
      <View
        className={styles['shopping-address']}
        onClick={shoppingAddressClick}
      >
        {/* 是否选择了地址 */}
        {selectShoppingAddress ? (
          <View className={styles['shopping-address-info']}>
            <Text className={styles['name-and-phone']}>
              {selectShoppingAddress.name} &nbsp; {selectShoppingAddress.phone}
            </Text>
            <Text className={styles['address']}>
              {selectShoppingAddress.area.join(' ')}
              {selectShoppingAddress.address}
            </Text>
          </View>
        ) : (
          <Text className={styles['shopping-address-msg']}>
            {shoppingAddressLength ? '请选择收货地址' : '请新增收货地址'}
          </Text>
        )}
        <View
          className={setClassName([
            'at-icon at-icon-chevron-right',
            styles['icon'],
          ])}
        />
      </View>
      {/* 产品列表 */}
      <View className={styles['product-list']}>
        {buyProductList.map((data, index) => (
          <ProductItemCom
            data={data}
            remarksBlur={(value) => {
              setBuyProductList((prev) => {
                const list: Array<IBuyProductItem> = JSON.parse(
                  JSON.stringify(prev),
                );
                list[index].remarks = value;
                return list;
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

/**
 * 产品
 * @param param0
 */
const ProductItemCom = ({
  data: {
    productId,
    productMainImg,
    productName,
    selectProductConfigList,
    productAmount,
    productShipping,
    buyQuantity,
  },
  remarksBlur,
}: {
  data: IBuyProductItem;
  remarksBlur: (value: string) => void;
}) => {
  return (
    <View className={styles['product-item']} key={productId}>
      {/* 主要信息 */}
      <View className={styles['logo-and-info']}>
        <View className={styles['logo']}>
          <ImagePreload
            src={productMainImg}
            width={180}
            height={180}
            borderRadius={14}
          />
        </View>
        <View className={styles['info']}>
          <Text className={styles['title']}>{productName}</Text>
          <Text className={styles['product-config']}>
            {selectProductConfigList.map(({ name }) => name).join(' ')}
          </Text>
          <Text className={styles['amount']}>
            ¥{' '}
            {transferAmount(
              selectProductConfigList.reduce<number>(
                (prev, current) => prev + current.amount,
                productAmount,
              ),
              'yuan',
            )}
            元
          </Text>
        </View>
      </View>
      {/* 购买须知 */}
      <AtList hasBorder={false}>
        <AtListItem
          hasBorder={false}
          title="运费"
          extraText={
            productShipping
              ? `¥ ${transferAmount(productShipping, 'yuan')} 元`
              : '包邮'
          }
        />
        <AtListItem
          hasBorder={false}
          title="购买数量"
          extraText={`x ${buyQuantity}`}
        />
        <RemarkCom blur={(value) => remarksBlur(value)} />
      </AtList>
    </View>
  );
};

/**
 * 备注输入框
 * @param param0
 */
const RemarkCom = ({ blur }: { blur: (value: string) => void }) => {
  const [value, setValue] = useState<string>('');
  return (
    <AtInput
      border={false}
      name="text"
      title="备注信息"
      type="text"
      value={value}
      onChange={(value) => setValue(value as string)}
      placeholder="备注信息"
      onBlur={() => {
        blur(value);
      }}
    />
  );
};

export default OrderConfirm;
