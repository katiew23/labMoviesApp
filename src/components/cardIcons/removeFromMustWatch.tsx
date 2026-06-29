import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatch: React.FC<BaseMovieProps> = (movie) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleRemoveFromMustWatch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={handleRemoveFromMustWatch}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatch;