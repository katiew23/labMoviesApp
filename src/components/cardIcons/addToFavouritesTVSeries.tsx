import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTVProps } from "../../types/interfaces";

const AddToFavouritesTVSeries: React.FC<BaseTVProps> = (series) => {
  const context = useContext(MoviesContext);

  console.log("Props received by AddToFavouritesTVSeries:", series);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Clicked TV series:", series);
    context.addToFavouritesTVSeries(series);
  };

  return (
    <IconButton aria-label="add to favourites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesTVSeries;