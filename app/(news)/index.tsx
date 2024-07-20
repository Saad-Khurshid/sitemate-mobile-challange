import SearchBox from "@/components/SearchInput";
import { View } from "@/components/Themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import NewsList from "./NewsList";

const index = () => {
  const [search, setSearch] = useState("");

  return (
    <View>
      <SearchBox search={search} setSearch={setSearch} />
      <NewsList search={search} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
