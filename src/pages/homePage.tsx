import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getFilteredMovies, searchMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
//import Button from "@mui/material/Button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PaginationControls from "../components/paginationControls";
import { AuthContext } from "../contexts/authContext";


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
  const { isAuthenticated } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  
  
  
  const { filterValues, setFilterValues, filterFunction } = useFiltering(movieFilters);

  const { data, error, isPending, isError, isPlaceholderData } = useQuery<DiscoverMovies, Error>({
  queryKey: [
    "discover",
    page,
    filterValues[0].value,
    filterValues[1].value,
    filterValues[2].value,
    filterValues[3].value,
  ],
  queryFn: () => {
    const title = filterValues[0].value;

    if (title) {
      return searchMovies(title, page);
    }

    return getFilteredMovies(
      page,
      filterValues[1].value,
      filterValues[2].value,
      filterValues[3].value
    );
  },
  placeholderData: keepPreviousData,
});
  
  //const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
  // ["discover", page],
  //() => getMovies(page)
  // );
  
 
  
  //useEffect(() => {
    //setFilterValues(
      //movieFilters.map((filter) => ({
       // name: filter.name,
       // value: filter.value,
     // }))
   // );
  //}, [page]);
  
  
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
    if (!isAuthenticated) {
      return null; //return nothin if the user is not authenticated
    }
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