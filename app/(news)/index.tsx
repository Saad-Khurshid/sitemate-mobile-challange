import SearchBox from "@/components/SearchInput";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import NewsList from "./NewsList";
import { useTheme } from "@react-navigation/native";

const index = () => {
  const [search, setSearch] = useState("");
  const colorScheme = useTheme();

  return (
    <View
      style={{
        backgroundColor: colorScheme.colors.background,
      }}
    >
      <SearchBox search={search} setSearch={setSearch} />
      {!search ? (
        <Text style={{ textAlign: "center", padding: 16 }}>
          Search for news articles
        </Text>
      ) : (
        <NewsList search={search} />
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
