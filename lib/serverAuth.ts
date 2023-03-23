import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

//to get the session of the user by sending 'req' as the parameter which will contain the jwt token.
const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }

  //find the current user with the email matching the logged in user's email.
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //user not signed in
  if (!currentUser) {
    throw new Error("Not Signed In");
  }

  return { currentUser }; //returning the entire user object
};

export default serverAuth;
