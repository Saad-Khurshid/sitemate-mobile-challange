import { FlatList } from "react-native";
import React from "react";
import { useGetNewsQuery } from "@/api/API";
import { Text, View } from "@/components/Themed";
import Loader from "@/components/Loader";
import { useTheme } from "@react-navigation/native";

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
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useGetNewsQuery(props.search);

  const news = data?.pages.map((page) => page).flat();

  const keyExtractor = (item: any) => item.id;

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.card,
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
    <View>
      {isLoading ? (
        <Loader />
      ) : isFetching ? (
        <Loader />
      ) : isError ? (
        <Text>`Error: ${error.message}`</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={isFetchingNextPage ? () => null : onEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default NewsList;
