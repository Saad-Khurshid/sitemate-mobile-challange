import React from "react";
import { FlatList } from "react-native";
import { useGetNewsQuery } from "@/api/API";
import { Text, View } from "@/components/Themed";
import Loader from "@/components/Loader";
import { useTheme } from "@react-navigation/native";
import { customAlphabet } from "nanoid/non-secure";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

type NewsListProps = {
  search: string;
};

const NewsList = (props: NewsListProps) => {
  const { colors } = useTheme();
  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetNewsQuery(props.search);

  const news = data?.pages.map((page) => page).flat();

  const keyExtractor = (_: any) => nanoid();

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontStyle: "italic",
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        By {item.author}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.text,
        }}
      >
        {item.description}
      </Text>
    </View>
  );

  const onEndReached = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Text>`Error: ${error.message}`</Text>
      ) : !!news?.length ? (
        <FlatList
          data={news}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={isFetchingNextPage ? () => null : onEndReached}
          onEndReachedThreshold={0.5}
          extraData={news}
        />
      ) : (
        <Text style={{ textAlign: "center", padding: 16 }}>
          No news articles found
        </Text>
      )}
    </View>
  );
};

export default NewsList;
