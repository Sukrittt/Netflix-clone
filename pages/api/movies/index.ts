import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); //wrong method
  }

  try {
    await serverAuth(req); //checking if user is logged in.
    const movies = await prismadb.movie.findMany(); //fetch all the movie list from the database.

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
