import useSWR from "swr";

import fetcher from "@/lib/fetcher";

//useSWR caches the data and will not fetch the data if it is already avaialble in the cache memory.
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
