import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {titleFilter, genreFilter} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import Button from "@mui/material/Button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

const { filterValues, setFilterValues, filterFunction } = useFiltering([
  titleFiltering,
  genreFiltering,
]);

if (isPending) {
  return <Spinner />;
}

if (isError) {
  return <h1>{error.message}</h1>;
}

const changeFilterValues = (type: string, value: string) => {
  const changedFilter = { name: type, value: value };
  const updatedFilterSet =
  type === "title"
  ? [changedFilter, filterValues[1]]
  : [filterValues[0], changedFilter];
  
  setFilterValues(updatedFilterSet);
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
  
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "20px",
  }}
  >
  <Button
  variant="contained"
  disabled={page === 1}
  onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 1))}
  >
  Previous
  </Button>
  
  <span>
  Page {page} of {data?.total_pages}
  </span>
  
  <Button
  variant="contained"
  disabled={isPlaceholderData || page >= (data?.total_pages ?? page)}
  onClick={() => setPage((oldPage) => oldPage + 1)}
  >
  Next
  </Button>
  
  {isFetching && <span>Loading...</span>}
  </div>
  
  
  <MovieFilterUI
  onFilterValuesChange={changeFilterValues}
  titleFilter={filterValues[0].value}
  genreFilter={filterValues[1].value}
  />
  </>
);
};

export default HomePage;