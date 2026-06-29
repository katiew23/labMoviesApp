import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";

const PlaylistAdd: React.FC<BaseMovieProps> = (movie) => {
  const { addToMustWatch } = useContext(MoviesContext);
  const navigate = useNavigate();

  const handleAddToMustWatch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToMustWatch(movie);
    navigate("/movies/mustwatch");
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlaylistAdd;