import React, { useEffect, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtInput, AtListItem } from 'taro-ui';
import { View, Picker } from '@tarojs/components';
import styles from './index.module.scss';
import { IAddShoppingAddressPathParams, ICityDataItem } from './interface';
import { EPageType } from './enums';
import { getCityData } from '../../api';
import { PickerMultiSelectorProps } from '_@tarojs_components@3.0.8@@tarojs/components/types/Picker';
const AddShoppingAddress = () => {
  const {
    params: { type = EPageType.ADD },
  } = useRouter<IAddShoppingAddressPathParams>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [area, setArea] = useState<Array<string>>([]);

  const [cityIndexList, setCityIndexList] = useState<Array<number>>([]);

  const [cityData, setCityData] = useState<Array<ICityDataItem>>([]); // 地区数据

  const [pickerData, setPickerData] = useState<Array<Array<ICityDataItem>>>([
    [],
    [],
    [],
  ]); // 选择器所需数据

  /**
   * picker选择后触发
   * @param indexList
   */
  const cityPickerChange = (indexList: Array<number>) => {
    console.log(indexList);

    setCityIndexList(indexList);
  };

  /**
   * picker某列选择后触发
   * @param ev
   */
  const cityPickerColumnChange = ({
    column,
    value,
  }: PickerMultiSelectorProps.onColumnChangeEvnetDetail) => {
    const list = JSON.parse(JSON.stringify(pickerData));
    const indexList = JSON.parse(JSON.stringify(cityIndexList));
    if (column === 0) {
      list[1] = list[0][value]?.children || [];
      list[2] = list[1][0]?.children || [];
      indexList[0] = value;
      indexList[1] = 0;
      indexList[2] = 0;
    }
    if (column === 1) {
      list[2] = list[1][value]?.children || [];
      indexList[1] = value;
      indexList[2] = 0;
    }
    if (column === 2) {
      indexList[2] = value;
    }
    setPickerData(list);
    setCityIndexList(indexList);
  };

  const getData = async () => {
    try {
      const data = await getCityData();
      setCityData(data);
    } catch (e) {}
  };

  // 监听获取的数据，设置默认的选择数据 [[0],[0],[0]]
  useEffect(() => {
    setPickerData((prev) => {
      const list = JSON.parse(JSON.stringify(prev));
      const parentData = cityData[0]?.children || [];
      list[0] = cityData;
      list[1] = parentData;
      list[2] = parentData[0]?.children || [];
      return list;
    });
  }, [cityData]);

  // 监听最终选择的地区picker
  useEffect(() => {
    const list: Array<string> = [];
    cityIndexList.forEach((index, i) => {
      list.push(pickerData[i][index].value);
    });
    setArea(list);
  }, [cityIndexList]);

  useEffect(() => {
    getData();
  }, []);
  /* 根据type设置title */
  useEffect(() => {
    let title: string;
    switch (type) {
      case EPageType.ADD:
        title = '新增收货地址';
        break;
      case EPageType.UPDATE:
        title = '修改收货地址';
        break;
      default:
        title = 'Go购';
    }
    Taro.setNavigationBarTitle({
      title,
    });
  }, []);

  return (
    <View className={styles['add-shopping-address-wrapper']}>
      <AtInput
        className={styles['input-item']}
        name="name"
        title="收件人"
        value={name}
        placeholder="请输入收件人"
        onChange={(value) => setName(value as string)}
      />
      <AtInput
        className={styles['input-item']}
        name="phone"
        title="联系电话"
        type="number"
        value={phone}
        placeholder="请输入手机号"
        onChange={(value) => setPhone(value as string)}
      />
      <Picker
        value={cityIndexList}
        mode="multiSelector"
        range={pickerData}
        rangeKey="value"
        onChange={(e) => cityPickerChange(e.detail.value)}
        onColumnChange={(e) => {
          cityPickerColumnChange(e.detail);
        }}
      >
        <AtListItem
          className={styles['picker-item']}
          arrow="right"
          title="所在地区"
          extraText={area.join(' ')}
          switchIsCheck
        />
      </Picker>
    </View>
  );
};

export default AddShoppingAddress;
