import useSwr from "swr";

import fetcher from "@/lib/fetcher";

//by sending a GET request to receive the movie details what is to be played.
const useMovie = (id?: string) => {
  //attatching the movie id in the query parameters.
  const { data, error, isLoading } = useSwr(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
};

export default useMovie;
