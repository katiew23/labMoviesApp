import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { TVDetailsProps } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateTVSeriesPageProps {
  series: TVDetailsProps;
  children: React.ReactElement;
}

const TemplateTVSeriesPage: React.FC<TemplateTVSeriesPageProps> = ({
  series,
  children,
}) => {
  return (
    <>
      <h1>{series.name}</h1>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              <ImageListItem sx={styles.gridListTile} cols={1}>
                <img
                  src={
                    series.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${series.poster_path}`
                      : img
                  }
                  alt={series.name}
                />
              </ImageListItem>
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTVSeriesPage;