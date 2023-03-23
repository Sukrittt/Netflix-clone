import useSWR from "swr";

import fetcher from "@/lib/fetcher";

//to fetch the movie data
const useBillBoard = () => {
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useBillBoard;
