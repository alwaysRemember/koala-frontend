import Taro, { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import "./index.sass";
import { ISearchInputProps } from "./interface";

const SearchInput = ({ isDisable = false }: ISearchInputProps) => {
  const [value, setValue] = useState<string>("");

  const valueChange = (value: string) => {
    setValue(value);
  };
  return (
    <View className="search">
      <AtSearchBar
        className="search-input"
        value={value}
        disabled={isDisable}
        onChange={valueChange}
        focus={!isDisable}
      />
    </View>
  );
};

export default SearchInput;
