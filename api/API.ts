import Config from "@/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: Config.apiUrl,
  params: {
    apiKey: Config.apiKey,
  },
});
const pageSize = 10;

const getNews = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | { search: string })[];
}) => {
  const [_key, { search }] = queryKey;
  const response = await api.get("/", {
    params: {
      q: search,
      page: pageParam,
      pageSize,
    },
  });
  return response.data.articles;
};

export const useGetNewsQuery = (search: string) =>
  useInfiniteQuery({
    queryKey: ["news", { search }],
    queryFn: getNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.length ?? 0) === pageSize ? pages.length + 1 : undefined,
  });
