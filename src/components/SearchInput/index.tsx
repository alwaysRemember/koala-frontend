import Taro, { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import "./index.sass";
import { ISearchInputProps } from "./interface";
import { ESearchHistoryRecordLocalKey } from "../../enums/EProduct";

const SearchInput = ({
  isDisable = false,
  searchConfirm
}: ISearchInputProps) => {
  const [value, setValue] = useState<string>("");

  const valueChange = (value: string) => {
    setValue(value);
  };

  /**
   * 搜索确认
   */
  const submit = () => {
    if (!value || !searchConfirm) return;
    // 读取缓存中的记录
    let data =
      Taro.getStorageSync(ESearchHistoryRecordLocalKey.SEARCH_HISTORY_RECORD) ||
      [];
    data.push(value);
    // 重新设置缓存中的记录
    Taro.setStorageSync(
      ESearchHistoryRecordLocalKey.SEARCH_HISTORY_RECORD,
      data
    );
    searchConfirm(value);
  };
  return (
    <View className="search">
      <AtSearchBar
        className="search-input"
        value={value}
        disabled={isDisable}
        onChange={valueChange}
        focus={!isDisable}
        onConfirm={submit}
        onActionClick={submit}
      />
    </View>
  );
};

export default SearchInput;
