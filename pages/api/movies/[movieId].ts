import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end(); //wrong method
  try {
    await serverAuth(req);

    const { movieId } = req.query; //id taken from query parameters.

    if (typeof movieId !== "string" || !movieId) throw new Error("Invalid Id"); //movieId's type should be string.

    //get the movie by it's id.
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) throw new Error("Invalid Id");

    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // bad method
  }
}
