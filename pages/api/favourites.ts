import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

//to retrieve the list of favourite movies.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end(); //wrong method

  try {
    const { currentUser } = await serverAuth(req); //get the current user after authentication.

    //contains the list of movies which matches the favourite id in the user's database.
    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });

    return res.status(200).json(favouriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end(); //bad method
  }
}
