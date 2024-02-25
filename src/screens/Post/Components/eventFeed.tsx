import { FlatList } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Loader } from "../../../helper/loader";
import { useFetchPost } from "../../../hooks/post/usePostApi";
import DispalyEvents from "../showEvent";

export const EventFeed = () => {
  const {
    data: response,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isStale,
    refetch,
  } = useFetchPost();
  // console.log(JSON.stringify(response, null, 2));
  const data = response?.pages?.flatMap((item) => item.data.data);

  if (isLoading) return <Loader />;

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <DispalyEvents value={item} />}
        ItemSeparatorComponent={() => <Divider bold />}
        ListEmptyComponent={() => <Text>No Data</Text>}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => hasNextPage && <Loader />}
        refreshing={!isStale}
        onRefresh={() => {
          refetch();
        }}
        onEndReached={() => {
          if (!isFetching) {
            // if (!hasNextPage) return <Text>No data available</Text>;
            fetchNextPage();
          }
        }}
        // onEndReachedThreshold={0}
      />
    </>
  );
};
