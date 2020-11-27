import Taro from '@tarojs/taro';
import React, { useState, useImperativeHandle, useEffect } from 'react';
import styles from './index.module.scss';
import { ISelectProductConfig } from './interface';
import { AtFloatLayout, AtButton } from 'taro-ui';
import { View, Text, Input } from '@tarojs/components';
import ImagePreload from '../../../../components/ImagePreload';
import {
  IProductConfigModuleItem,
  IProductConfigModuleOption,
} from '../../interface';
import { setClassName, transferAmount } from '../../../../utils';
import { showToast } from '../../../../utils/wxUtils';
const SelectProductConfig = ({
  productShowAmount,
  productConfig,
  data,
  cref,
  buyNow,
  selectProductConfigListChange,
  saveToShoppingCart,
}: ISelectProductConfig) => {
  useImperativeHandle(cref, () => ({
    changeShow: (type) => {
      setShow(type);
    },
    getBuyQuantity: () => buyQuantity,
  }));

  const [amount, setAmount] = useState<string>(productShowAmount);
  const [show, setShow] = useState<boolean>(false);
  const [productConfigList, setProductConfigList] = useState<
    Array<IProductConfigModuleItem>
  >(productConfig);
  const [
    selectProductConfigOptionList,
    setSelectProductConfigOptionList,
  ] = useState<Array<IProductConfigModuleOption>>([]);

  const [buyQuantity, setBuyQuantity] = useState<number>(1); // 购买数量

  /**
   * 选择商品配置项
   * @param index  配置项在分类中的下标
   * @param parentIndex 分类下标
   */
  const selectProductConfigOption = (index: number, parentIndex: number) => {
    const productConfigListClone: Array<IProductConfigModuleItem> = JSON.parse(
      JSON.stringify(productConfigList),
    );

    productConfigListClone[parentIndex].list.forEach((data) => {
      data.isSelect = false;
    });
    productConfigListClone[parentIndex].list[index].isSelect = true;
    setProductConfigList(productConfigListClone);
  };

  /**
   * 配置组渲染
   * @param param0
   */
  const ProductConfigModule = ({
    data: { categoryName, list },
    index,
  }: {
    data: IProductConfigModuleItem;
    index: number;
  }) => {
    return (
      <View className={styles['product-config-category-item']}>
        <Text className={styles['category-title']}>{categoryName}</Text>
        <View className={styles['product-config-options-wrapper']}>
          {list.map(({ name, isSelect }, i) => (
            <Text
              className={setClassName([
                styles['product-config-option'],
                isSelect ? styles['select'] : '',
              ])}
              onClick={() => {
                selectProductConfigOption(i, index);
              }}
            >
              {name}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const inputBuyQuantity = ({ detail: { value } }) => {
    let n = Number(value);
    if (n < 0) {
      showToast({
        title: '购买数量不能小于0',
      });
      return;
    }
    setBuyQuantity(n || 0);
  };
  useEffect(() => {
    setAmount(productShowAmount);
  }, [productShowAmount]);
  useEffect(() => {
    setProductConfigList(productConfig);
  }, [productConfig]);

  // 保存选中的配置项
  useEffect(() => {
    let arr: Array<IProductConfigModuleOption> = [];
    productConfigList.forEach((data) => {
      data.list.forEach((item) => {
        if (item.isSelect) {
          arr.push(item);
        }
      });
    });
    setSelectProductConfigOptionList(arr);
  }, [productConfigList]);

  // 根据选中的配置项设置金额
  useEffect(() => {
    selectProductConfigOptionList.length &&
      setAmount(
        transferAmount(
          selectProductConfigOptionList.reduce<number>((prev, current) => {
            prev += current.amount;
            return prev;
          }, data.productAmount),
          'yuan',
        ) as string,
      );
    selectProductConfigListChange(selectProductConfigOptionList);
  }, [selectProductConfigOptionList]);

  return (
    <AtFloatLayout
      isOpened={show}
      onClose={() => setShow(false)}
      scrollY
      className={styles['product-config-modal-wrapper']}
    >
      <View className={styles['product-config-modal-con']}>
        {/* 头部数据显示部分 */}
        <View className={styles['product-info-con']}>
          <View className={styles['product-main-img']}>
            <ImagePreload
              src={data.productMainImg}
              width={215}
              height={215}
              borderRadius={14}
            />
          </View>
          <View className={styles['product-info']}>
            <Text className={styles['amount']}>¥ {amount}</Text>
            <Text className={styles['inventory']}>库存: 充足</Text>
            <Text className={styles['selected']}>
              {!!selectProductConfigOptionList.length ? '已选: ' : '请选择:'}
              {!selectProductConfigOptionList.length &&
                productConfigList.map(({ categoryName }) => (
                  <Text key={categoryName}>&nbsp;{categoryName}</Text>
                ))}
              {selectProductConfigOptionList.map((item) => (
                <Text key={item.id}>{item.name}&nbsp;</Text>
              ))}
            </Text>
          </View>
        </View>
        {/* 商品配置选择 */}
        <View className={styles['product-config-list-con']}>
          {productConfigList.map((data, index) => (
            <ProductConfigModule
              key={data.categoryName}
              data={data}
              index={index}
            />
          ))}
        </View>
        {/* 购买数量 */}
        <View className={styles['buy-quantity']}>
          <Text className={styles['label']}>购买数量: </Text>
          {/* 数量切换操作 */}
          <View className={styles['input-quantity-wrapper']}>
            <AtButton
              type="primary"
              disabled={buyQuantity <= 1}
              className={setClassName([
                styles['quantity-change-btn'],
                styles['subtract'],
              ])}
              onClick={() => {
                setBuyQuantity((prev) => prev - 1);
              }}
            >
              <View
                className={setClassName([
                  'at-icon',
                  'at-icon-subtract',
                  styles['change-icon'],
                ])}
              />
            </AtButton>
            <Input
              type="number"
              value={String(buyQuantity)}
              className={styles['input-quantity']}
              onBlur={inputBuyQuantity}
              onConfirm={inputBuyQuantity}
            />
            <AtButton
              type="primary"
              className={setClassName([
                styles['quantity-change-btn'],
                styles['add'],
              ])}
              onClick={() => {
                setBuyQuantity((prev) => prev + 1);
              }}
            >
              <View
                className={setClassName([
                  'at-icon',
                  'at-icon-add',
                  styles['change-icon'],
                ])}
              />
            </AtButton>
          </View>
        </View>
        {/* 下单操作 */}
        <View className={styles['operation-wrapper']}>
          <AtButton
            type="primary"
            size="small"
            className={setClassName([
              styles['add-shopping-cart'],
              styles['btn'],
            ])}
            onClick={() => {
              saveToShoppingCart('modal');
            }}
          >
            加入购物车
          </AtButton>
          <AtButton
            size="small"
            type="primary"
            className={setClassName([styles['buy-now'], styles['btn']])}
            onClick={() => {
              buyNow('modal');
            }}
          >
            立即购买
          </AtButton>
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default SelectProductConfig;
