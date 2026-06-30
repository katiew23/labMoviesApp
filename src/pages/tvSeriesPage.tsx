import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesCard from "../components/tvSeriesCard";
import Grid from "@mui/material/Grid";
import TVSeriesFilterUI, {nameFilter, genreFilter} from "../components/tvSeriesFilterUI";
import useFiltering from "../hooks/useFiltering";

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
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(
    "tvSeries",
    getTVSeries
  );
  
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    nameFiltering,
    genreFiltering,
  ]);
  
  const [sortBy, setSortBy] = useState("name");
  
  if (isLoading) {
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
  
  return (
    <>
    <h1>Popular TV Series</h1>
    
    <Grid container spacing={5} style={{ padding: "15px" }}>
    {sortedTVSeries.map((series) => (
      <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
      <TVSeriesCard
      series={series}
      action={(series: BaseTVProps) => {
        return null;
      }}
      />
      </Grid>
    ))}
    </Grid>
    
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