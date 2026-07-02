import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesCard from "../components/tvSeriesCard";
import Grid from "@mui/material/Grid";
import TVSeriesFilterUI, {nameFilter,genreFilter} from "../components/tvSeriesFilterUI";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesTVSeries from "../components/cardIcons/addToFavouritesTVSeries";
import Button from "@mui/material/Button";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TVSeriesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
  } = useQuery<DiscoverTV, Error>({
    queryKey: ["tvSeries", page],
    queryFn: () => getTVSeries(page),
    placeholderData: keepPreviousData,
  });
  
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    nameFiltering,
    genreFiltering,
  ]);
  
  const [sortBy, setSortBy] = useState("name");
  
  if (isPending) {
    return <Spinner />;
  }
  
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const changeFilterValues = (type: string, value: string) => {
    if (type === "sort") {
      setSortBy(value);
    } else {
      const changedFilter = { name: type, value: value };
      const updatedFilterSet =
      type === "name"
      ? [changedFilter, filterValues[1]]
      : [filterValues[0], changedFilter];
      
      setFilterValues(updatedFilterSet);
    }
  };
  
  const tvSeries = data ? data.results : [];
  const displayedTVSeries = filterFunction(tvSeries);
  
  const sortedTVSeries = [...displayedTVSeries].sort((a, b) => {
    if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    }
    
    if (sortBy === "date") {
      return b.first_air_date.localeCompare(a.first_air_date);
    }
    
    return a.name.localeCompare(b.name);
  });
  
  console.log("TV series data:", sortedTVSeries);
  console.log("Current page:", page);
  console.log("Raw TV data:", data);
  console.log("TV series results:", tvSeries);
  console.log("Displayed TV series:", sortedTVSeries);
  
  return (
    <>
    <h1>Popular TV Series</h1>
    
    <Grid container spacing={5} style={{ padding: "15px" }}>
    {sortedTVSeries.map((series) => (
      <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
      <TVSeriesCard
      series={series}
      action={(series: BaseTVProps) => {
        return <AddToFavouritesTVSeries {...series} />;
      }}
      />
      </Grid>
    ))}
    </Grid>
    
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
    
    <TVSeriesFilterUI
    onFilterValuesChange={changeFilterValues}
    nameFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
    sortBy={sortBy}
    />
    </>
  );
};

export default TVSeriesPage;