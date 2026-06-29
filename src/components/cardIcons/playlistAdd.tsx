import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";

const PlaylistAdd: React.FC<BaseMovieProps> = (movie) => {
  return (
    <PlaylistAddIcon color="primary" fontSize="large" />
  );
};

export default PlaylistAdd;