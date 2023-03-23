import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

//handles post and delete calls for favourite movies.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //adding movie to favourites
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req); //getting the current user after checking that user is logged in.
      const { movieId } = req.body;

      //find the movie by it's id.
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) throw new Error("Invalid Id"); //invalid id

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "", //first find the user by email id.
        },
        data: {
          favouriteIds: {
            push: movieId, //push the movie id in the array.
          },
        },
      });

      return res.status(200).json(user);
    }

    //removing movie from favourites
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) throw new Error("Invalid id"); //invalid id

      const updatedFavouriteIds = without(currentUser.favouriteIds, movieId); //will return a array of ids excluding "movieId".

      //update the user's favouriteIds array with "updatedFavouriteIds".
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: updatedFavouriteIds,
        },
      });

      return res.status(200).json(user);
    }

    return res.status(405).end(); //wrong method
  } catch (error) {
    console.log(error);
    return res.status(400).end(); //bad method
  }
}
