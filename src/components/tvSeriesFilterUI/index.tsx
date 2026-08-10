import React, { useState } from "react";
import FilterCard from "../filterTVSeriesCard";
import Drawer from "@mui/material/Drawer";
import { BaseTVProps } from "../../types/interfaces";
import Button from "@mui/material/Button";

export const nameFilter = (series: BaseTVProps, value: string): boolean => {
  return series.name.toLowerCase().search(String(value).toLowerCase()) !== -1;
};

export const genreFilter = (series: BaseTVProps, value: string) => {
  const genreId = Number(value);
  const genreIds = series.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
  root: {
    backgroundColor: "#000000",
  },
  fab: {
    position: "fixed",
    top: 90,
    left: 200,
    zIndex: 1200,
  },
};

interface TVSeriesFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  nameFilter: string;
  genreFilter: string;
  ratingFilter: string;
  yearFilter: string;
  sortBy: string;
}

const TVSeriesFilterUI: React.FC<TVSeriesFilterUIProps> = ({
  onFilterValuesChange,
  nameFilter,
  genreFilter,
  ratingFilter,
  yearFilter,
  sortBy,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  return (
    <>
    <Button
    variant="contained"
    onClick={() => setDrawerOpen(true)}
    sx={{
      ...styles.fab,
      backgroundColor: "#1f1f1f",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#333333",
      },
    }}
    >
    Search & Filter Tv Series
    </Button>
    
    <Drawer
    anchor="left"
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    >
    <FilterCard
    onUserInput={onFilterValuesChange}
    nameFilter={nameFilter}
    genreFilter={genreFilter}
    ratingFilter={ratingFilter}
    yearFilter={yearFilter}
    sortBy={sortBy}
    />
    </Drawer>
    </>
  );
};

export default TVSeriesFilterUI;