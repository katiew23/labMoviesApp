import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {titleFilter, genreFilter} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
//import Button from "@mui/material/Button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PaginationControls from "../components/paginationControls";

const movieFilters = [
  {
    name: "title",
    value: "",
    condition: (movie: any, value: string) =>
      movie.title.toLowerCase().includes(value.toLowerCase()),
  },
  {
    name: "genre",
    value: "0",
    condition: (movie: any, value: string) =>
      value === "0" || movie.genre_ids.includes(Number(value)),
  },
  {
    name: "rating",
    value: "0",
    condition: (movie: any, value: string) =>
      movie.vote_average >= Number(value),
  },
  {
    name: "year",
    value: "",
    condition: (movie: any, value: string) =>
      value === "" || movie.release_date?.startsWith(value),
  },
];

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  
  
const { data, error, isPending, isError, isFetching, isPlaceholderData} = useQuery<DiscoverMovies, Error>({
  queryKey: ["discover", page],
  queryFn: () => getMovies(page),
  placeholderData: keepPreviousData,
});

//const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
// ["discover", page],
//() => getMovies(page)
// );

const { filterValues, setFilterValues, filterFunction } = useFiltering(movieFilters);
 

if (isPending) {
  return <Spinner />;
}

if (isError) {
  return <h1>{error.message}</h1>;
}

const changeFilterValues = (type: string, value: string) => {
  const updatedFilterValues = filterValues.map((filter) =>
    filter.name === type ? { ...filter, value } : filter
  );
  setFilterValues(updatedFilterValues);
};

const movies = data ? data.results : [];
const displayedMovies = filterFunction(movies);

console.log("Current movie page:", page);
console.log("Raw movie data:", data);
console.log("Displayed movies:", displayedMovies);

return (
  <>
    <PageTemplate
      title="Discover Movies"
      movies={displayedMovies}
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

    <MovieFilterUI
      onFilterValuesChange={changeFilterValues}
      titleFilter={filterValues[0].value}
      genreFilter={filterValues[1].value}
      ratingFilter={filterValues[2].value}
      yearFilter={filterValues[3].value}
    />
  </>
);
};

export default HomePage;