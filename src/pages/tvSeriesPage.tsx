import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilteredTVSeries, searchTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesFilterUI from "../components/tvSeriesFilterUI";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesTVSeries from "../components/cardIcons/addToFavouritesTVSeries";
//import Button from "@mui/material/Button";
import PaginationControls from "../components/paginationControls";
//import Typography from "@mui/material/Typography";
import TemplateTVSeriesListPage from "../components/templateTVSeriesList";

const tvSeriesFilters = [
  {
    name: "name",
    value: "",
    condition: (series: any, value: string) =>
      series.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    name: "genre",
    value: "0",
    condition: (series: any, value: string) =>
      value === "0" || series.genre_ids.includes(Number(value)),
  },
  {
    name: "rating",
    value: "0",
    condition: (series: any, value: string) =>
      series.vote_average >= Number(value),
  },
  {
    name: "year",
    value: "",
    condition: (series: any, value: string) =>
      value === "" || series.first_air_date?.startsWith(value),
  },
];



const TVSeriesPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { filterValues, setFilterValues } =
    useFiltering(tvSeriesFilters);

  const [sortBy, setSortBy] = useState("name");

  const {
    data,
    error,
    isPending,
    isError,
    isPlaceholderData,
  } = useQuery<DiscoverTV, Error>({
    queryKey: [
      "tvSeries",
      page,
      filterValues[0].value,
      filterValues[1].value,
      filterValues[2].value,
      filterValues[3].value,
    ],

    queryFn: () => {
      const name = filterValues[0].value;

      if (name) {
        return searchTVSeries(name, page);
      }

      return getFilteredTVSeries(
        page,
        filterValues[1].value,
        filterValues[2].value,
        filterValues[3].value
      );
    },

    placeholderData: keepPreviousData,
  });  
  
    
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
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );

    setPage(1);
    setFilterValues(updatedFilterSet);
  }
};
  
  const tvSeries = data ? data.results : [];
  const displayedTVSeries = tvSeries;
  
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
      
    <TemplateTVSeriesListPage
      title="Popular TV Series"
      series={sortedTVSeries}
      action={(series: BaseTVProps) => {
        return <AddToFavouritesTVSeries {...series} />;
      }}
      />
      
    
    <PaginationControls
    page={page}
    setPage={setPage}
    totalPages={data?.total_pages}
    isPlaceholderData={isPlaceholderData}
    />
    
    <TVSeriesFilterUI
    onFilterValuesChange={changeFilterValues}
    nameFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
    ratingFilter={filterValues[2].value}
    yearFilter={filterValues[3].value}
    sortBy={sortBy}
    />
    </>
  );
};

export default TVSeriesPage;