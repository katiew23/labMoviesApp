import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import TvIcon from "@mui/icons-material/Tv";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { TVDetailsProps } from "../../types/interfaces";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
};

const TVSeriesDetails: React.FC<TVDetailsProps> = (series) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {series.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {series.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<TvIcon />} label={`${series.number_of_seasons} seasons`} />
        <Chip icon={<TvIcon />} label={`${series.number_of_episodes} episodes`} />
        <Chip icon={<StarRate />} label={`${series.vote_average}`} />
        <Chip icon={<CalendarIcon />} label={`First Air Date: ${series.first_air_date}`} />
        <Chip label={`Status: ${series.status}`} />
      </Paper>

      {series.tagline ? (
        <Typography variant="h6" component="p">
          {series.tagline}
        </Typography>
      ) : null}
    </>
  );
};

export default TVSeriesDetails;