import React from "react";
import FavoritesPage from "../container/FavoritesPage";
import Head from "next/head";

const Favorites = () => {
  return (
    <div>
      <Head>
        <title>Favorities</title>
      </Head>
      <FavoritesPage />
    </div>
  );
};

export default Favorites;
