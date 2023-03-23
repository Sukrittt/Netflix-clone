import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); //method not allowed
  }

  try {
    const { email, name, password } = req.body; //extract the data from the body.

    const existingUser = await prismadb.user.findUnique({
      where: {
        email, //it will search if 'email' exists in the database.
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" }); //unprocessable entity
    }

    const hashedPassword = await bcrypt.hash(password, 12); //converting the password into hashed password with adding salt of length 12.

    //create a prismadb user
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user); //send the newly created user as a response.
  } catch (error) {
    console.log(error);
    res.status(400).end(); //bad request
  }
}
