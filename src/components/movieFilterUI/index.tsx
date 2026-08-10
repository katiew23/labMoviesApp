import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
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

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  yearFilter: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  ratingFilter,
  yearFilter,
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
    titleFilter={titleFilter}
    genreFilter={genreFilter}
    ratingFilter={ratingFilter}
    yearFilter={yearFilter}
    />
    </Drawer>
    </>
  );
};

export default MovieFilterUI;
