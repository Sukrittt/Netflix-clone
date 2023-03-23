import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import Navbar from "@/Components/Navbar";
import Billboard from "@/Components/Billboard";
import MovieList from "@/Components/MovieList";
import InfoModal from "@/Components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import useInfoModel from "@/hooks/useInfoModel";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); //get the session from the user

  //if session does not exist or we can say if the user is not logged in.
  if (!session) {
    return {
      redirect: {
        destination: "/auth", //redirect to auth page.
        permanent: false, //temporary url
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList(); //get all movie details with the default set to be an empty array.
  const { data: favourites = [] } = useFavourites(); //get all FAVOURITE movie details with the default set to be an empty array.
  const { isOpen, closeModal } = useInfoModel();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favourites} title="My List" />
      </div>
    </>
  );
}
