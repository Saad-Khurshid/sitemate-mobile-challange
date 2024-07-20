import React, { useState, useEffect, FC } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
//@ts-ignore // will add types.d.ts later
import debounce from "lodash.debounce";

interface SearchBoxProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ search, setSearch }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(search);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debouncedSetSearch = debounce(setSearch, 1000);

  useEffect(() => {
    debouncedSetSearch(inputValue);

    const newSuggestions = [...Array(10).keys()].map(
      (i) => `Suggestion ${i + 1}`
    );
    setSuggestions(newSuggestions);

    return () => debouncedSetSearch.cancel();
  }, [inputValue]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            paddingLeft: 10,
            color: theme.colors.text,
            borderColor: "transparent", // Remove border from TextInput
          }}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Search..."
        />
        <TouchableOpacity
          onPress={() => setInputValue("")}
          style={{ padding: 10 }}
        >
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBox;
