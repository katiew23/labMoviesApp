import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter, } from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { BaseMovieProps } from "../types/interfaces";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds, reorderFavourites } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  
  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    }),
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = favouriteMovieQueries.find((m) => m.isPending === true);
  
  if (isPending) {
    return <Spinner />;
  }
  
  const allFavourites = favouriteMovieQueries
  .map((q) => q.data)
  .filter((movie) => movie !== undefined);
  const displayedMovies = allFavourites
  ? filterFunction(allFavourites)
  : [];
  
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
    type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };
  
  const moveMovie = async (
    movieId: number,
    direction: "up" | "down"
  ) => {
    const currentIndex = movieIds.indexOf(movieId);
    
    if (currentIndex === -1) return;
    
    const newIndex =
    direction === "up"
    ? currentIndex - 1
    : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= movieIds.length) return;
    
    const newOrder = [...movieIds];
    
    [newOrder[currentIndex], newOrder[newIndex]] = [
      newOrder[newIndex],
      newOrder[currentIndex],
    ];
    
    await reorderFavourites(newOrder);
  };
  
  return (
    <>
    <PageTemplate
    title="Favourite Movies"
    movies={displayedMovies}
    action={(movie: BaseMovieProps) => {
      return (
        <>
        <IconButton
        onClick={() => moveMovie(movie.id, "up")}
        disabled={movieIds.indexOf(movie.id) === 0}
        >
        <ArrowUpwardIcon />
        </IconButton>
        
        <IconButton
        onClick={() => moveMovie(movie.id, "down")}
        disabled={
          movieIds.indexOf(movie.id) === movieIds.length - 1
        }
        >
        <ArrowDownwardIcon />
        </IconButton>
        <RemoveFromFavourites {...movie} />
        <WriteReview {...movie} />
        </>
      );
    }}
    />
    
    <MovieFilterUI
    onFilterValuesChange={changeFilterValues}
    titleFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
    ratingFilter=""
    yearFilter=""
    />
    </>
  );
};

export default FavouriteMoviesPage;
