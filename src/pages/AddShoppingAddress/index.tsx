import React, { useEffect, useState } from 'react';
import Taro, { useDidHide, useRouter } from '@tarojs/taro';
import { AtInput, AtListItem, AtTextarea, AtButton, AtSwitch } from 'taro-ui';
import { View, Picker } from '@tarojs/components';
import styles from './index.module.scss';
import {
  IAddShoppingAddressParams,
  IAddShoppingAddressPathParams,
  ICityDataItem,
} from './interface';
import { EPageSource, EPageType } from './enums';
import { PickerMultiSelectorProps } from '_@tarojs_components@3.0.8@@tarojs/components/types/Picker';
import { checkPhone } from '../../utils';
import { showToast } from '../../utils/wxUtils';
import city from '../../common/json/city.json';
import { addShoppingAddress } from '../../api';
import { EToastIcon } from '../../enums/EWXUtils';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from 'src/store/reducers/interface';
import { selectShoppingAddress } from '../../store/actions';
const AddShoppingAddress = () => {
  const {
    params: { type = EPageType.ADD, source = EPageSource.ADDRESS_LIST },
  } = useRouter<IAddShoppingAddressPathParams>();
  const { shoppingAddress } = useMappedState<IReducers>((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [area, setArea] = useState<Array<string>>([]); // 选择的地区
  const [address, setAddress] = useState<string>(''); // 详细地址
  const [isDefaultSelection, setIsDefaultSelection] = useState<boolean>(false); // 是否默认选择

  const [cityIndexList, setCityIndexList] = useState<Array<number>>([]);

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
      const params: IAddShoppingAddressParams = {
        name,
        phone,
        area,
        address,
        isDefaultSelection,
      };
      if (type === EPageType.UPDATE && shoppingAddress) {
        params.id = shoppingAddress.id;
      }
      const data = await addShoppingAddress(params);
      //  如果来源为订单确认页面，则需要存入redux
      if (source === EPageSource.ORDER_CONFIRM) {
        dispatch(selectShoppingAddress(data));
      }
      await showToast({
        title: type === EPageType.ADD ? '新增成功' : '修改成功',
        icon: EToastIcon.SUCCESS,
      });
      Taro.navigateBack();
    } catch (e) {}
  };

  /**
   * 根据redux中的area数据设置picker选择index
   * @param area
   */
  const _setCityIndexToArea = (area: Array<string>) => {
    let num: number = 0; // 当前遍历到的省市区数组下标位置
    const resultList: Array<{ index: number; list: Array<ICityDataItem> }> = []; // 最终结果
    const indexList: Array<number> = [];
    const cityList: Array<Array<ICityDataItem>> = [];
    /**
     * 查询当前的地区所在下标
     * @param arr  当前数组数据
     * @param value 当前地区
     */
    const findIndex = (arr: Array<ICityDataItem>, value: string) => {
      let index: number = 0;
      const result = arr.find((item, i) => {
        if (item.value === value) {
          index = i;
          num++;
        }
        return item.value === value;
      });
      if (result) {
        resultList.push({ index, list: arr });
      }
      if (result?.children.length) {
        findIndex(result.children, area[num]);
      }
    };

    findIndex(city.data, area[num]);
    resultList.forEach(({ index, list }) => {
      indexList.push(index);
      cityList.push(list);
    });
    setPickerData(cityList);
    setCityIndexList(indexList);
  };

  // 判断是否为编辑模式
  useEffect(() => {
    if (type !== EPageType.UPDATE) {
      // 设置默认选择第一组城市数据
      setPickerData((prev) => {
        const list = JSON.parse(JSON.stringify(prev));
        const parentData = city.data[0]?.children || [];
        list[0] = city.data;
        list[1] = parentData;
        list[2] = parentData[0]?.children || [];
        return list;
      });
      return;
    }
    if (!shoppingAddress) return;
    const { name, phone, isDefaultSelection, area, address } = shoppingAddress;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setIsDefaultSelection(isDefaultSelection);
    _setCityIndexToArea(area);
  }, []);

  // 监听最终选择的地区picker
  useEffect(() => {
    const list: Array<string> = [];
    cityIndexList.forEach((index, i) => {
      list.push(pickerData[i][index].value || '');
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

  useDidHide(() => {
    // 如果页面来源不是订单确认页面 清空redux地址数据
    if (source === EPageSource.ORDER_CONFIRM) {
      dispatch(selectShoppingAddress(null));
    }
  });

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
