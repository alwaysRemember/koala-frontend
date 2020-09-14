import React, { useEffect, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtInput, AtListItem, AtTextarea, AtButton, AtSwitch } from 'taro-ui';
import { View, Picker } from '@tarojs/components';
import styles from './index.module.scss';
import { IAddShoppingAddressPathParams, ICityDataItem } from './interface';
import { EPageType } from './enums';
import { PickerMultiSelectorProps } from '_@tarojs_components@3.0.8@@tarojs/components/types/Picker';
import { checkPhone } from '../../utils';
import { showToast } from '../../utils/wxUtils';
import city from '../../common/json/city.json';
import { addShoppingAddress } from '../../api';
import { EToastIcon } from '../../enums/EWXUtils';
const AddShoppingAddress = () => {
  const {
    params: { type = EPageType.ADD },
  } = useRouter<IAddShoppingAddressPathParams>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [area, setArea] = useState<Array<string>>([]); // 选择的地区
  const [address, setAddress] = useState<string>(''); // 详细地址
  const [isDefaultSelection, setIsDefaultSelection] = useState<boolean>(false); // 是否默认选择

  const [cityIndexList, setCityIndexList] = useState<Array<number>>([]);

  const [cityData] = useState<Array<ICityDataItem>>(city.data); // 地区数据

  const [pickerData, setPickerData] = useState<Array<Array<ICityDataItem>>>([
    [],
    [],
    [],
  ]); // 选择器所需数据

  const [disable, setDisable] = useState<boolean>(true);

  /**
   * picker选择后触发
   * @param indexList
   */
  const cityPickerChange = (indexList: Array<number>) => {
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

  /**
   * 提交数据
   */
  const submit = async () => {
    try {
      await addShoppingAddress({
        name,
        phone,
        area,
        address,
        isDefaultSelection,
      });
      await showToast({
        title: '新增成功',
        icon: EToastIcon.SUCCESS,
      });
      Taro.navigateBack();
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

  // 监听必要的输入数据
  useEffect(() => {
    setDisable(!name || !checkPhone(phone) || !area.length || !address);
  }, [name, phone, area, address]);

  return (
    <View className={styles['add-shopping-address-wrapper']}>
      <AtInput
        className={styles['input-item']}
        name="name"
        title="收件人"
        value={name}
        placeholder="请输入收件人"
        required
        onChange={(value) => setName(value as string)}
      />
      <AtInput
        className={styles['input-item']}
        name="phone"
        title="联系电话"
        type="phone"
        value={phone}
        maxlength={11}
        placeholder="请输入手机号"
        required
        onChange={(value) => setPhone(value as string)}
        onBlur={(value) => {
          if (!checkPhone(String(value))) {
            showToast({
              title: '手机号格式错误',
            });
          }
        }}
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
          extraText={area.length ? area.join(' ') : '请选择地区'}
        />
      </Picker>
      <View className={styles['address']}>
        <AtTextarea
          value={address}
          onChange={(value) => setAddress(value)}
          placeholder="请输入详细地址"
          count={false}
        />
      </View>

      <AtSwitch
        title="是否设为默认选项"
        checked={isDefaultSelection}
        color="#e93b3d"
        onChange={(value) => setIsDefaultSelection(value)}
      />

      <AtButton
        type="primary"
        disabled={disable}
        className={styles['submit']}
        onClick={submit}
      >
        提交
      </AtButton>
    </View>
  );
};

export default AddShoppingAddress;
