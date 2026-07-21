import React from "react";
import CategoryNavigationHeader from "../categoryNavigationHeader";
import Grid from "@mui/material/Grid";
import TVSeriesCard from "../tvSeriesCard";
import { TemplateTVSeriesListPageProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TemplateTVSeriesListPage: React.FC<
  TemplateTVSeriesListPageProps
> = ({ title, series, action }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <CategoryNavigationHeader title={title} />
      </Grid>

      <Grid item container spacing={5} sx={{ padding: "15px" }}>
        {series.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard
              series={item}
              action={action}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TemplateTVSeriesListPage;