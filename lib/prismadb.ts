import { PrismaClient } from "@prisma/client";

//if there is already a client use that otherwise create a client to avoid multiple client creation on hot reloading.
const client = global.prismadb || new PrismaClient();

//if application is running in production environment then assign client to global.prismadb.
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
