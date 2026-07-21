import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
//import Button from "@mui/material/Button";
import PaginationControls from "../components/paginationControls";


const PopularMoviesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const {
    data,
    error,
    isPending,
    isError,
    //isFetching, never used 
    isPlaceholderData,
  } = useQuery<DiscoverMovies, Error>({
    queryKey: ["popular", page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });
  
  if (isPending) {
    return <Spinner />;
  }
  
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const movies = data ? data.results : [];
  
  return (
    <>
    <PageTemplate
    title="Popular Movies"
    movies={movies}
    action={(movie: BaseMovieProps) => {
      return (
        <>
        <AddToFavouritesIcon {...movie} />
        <PlaylistAdd {...movie} />
        </>
      );
    }}
    />
    
    <PaginationControls
    page={page}
    setPage={setPage}
    totalPages={data?.total_pages}
    isPlaceholderData={isPlaceholderData}
    />
    </>
  );
};

export default PopularMoviesPage;