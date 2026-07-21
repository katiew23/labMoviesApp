import React from "react";
import CategoryNavigationHeader from "../categoryNavigationHeader";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <CategoryNavigationHeader title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPageTemplate;
