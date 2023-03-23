import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); //method not allowed
  }

  try {
    await serverAuth(req); //will give me the user details if the user is logged in.

    const movieCount = await prismadb.movie.count(); //will count the number of movies in the mongo db database.
    const randomIndex = Math.floor(Math.random() * movieCount); //will pick a random movie index.

    //to pick a random movie from the database.
    const randomMovie = await prismadb.movie.findMany({
      take: 1, //take only one record
      skip: randomIndex, //skip 'randomIndex' movies
    });

    //since random movie is going to be an array of values, pick the first movie, even though there is only one movie.
    res.status(200).json(randomMovie[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
