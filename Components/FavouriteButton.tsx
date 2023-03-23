import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  //memoize the result so that it can be used elsewhere.
  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || []; //contains a list of all the favourite movie's id.

    return list.includes(movieId); //checking if the movieId is present in the favourite list.
  }, [currentUser, movieId]);

  //to toggle favourites
  const toggleFavourites = useCallback(async () => {
    let response;

    //if the movie is in favourites then send a DELETE request else send a POST request.
    if (isFavourite) {
      response = await axios.delete("/api/favourite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favourite", { movieId });
    }

    const updatedFavouriteIds = response?.data?.favouriteIds; //contains the list of all favourite ids.

    mutate({
      ...currentUser, //list out all the properties in the "currentUser" object.
      favouriteIds: updatedFavouriteIds, //along with it update "favouriteIds" field with the updated ids.
    });

    mutateFavourites();
  }, [movieId, isFavourite, mutate, currentUser, mutateFavourites]);

  //Contains an icon as per the favourites.
  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      onClick={toggleFavourites}
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
