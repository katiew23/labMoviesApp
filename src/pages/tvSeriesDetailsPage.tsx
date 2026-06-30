import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import { TVDetailsProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import TemplateTVSeriesPage from "../components/templateTVSeriesPage";
import TVSeriesDetails from "../components/tvSeriesDetails";

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: series, error, isLoading, isError } = useQuery<TVDetailsProps, Error>(
    ["tvSeries", id],
    () => getTVSeriesDetails(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {series ? (
        <TemplateTVSeriesPage series={series}>
          <TVSeriesDetails {...series} />
        </TemplateTVSeriesPage>
      ) : (
        <p>Waiting for TV series details</p>
      )}
    </>
  );
};

export default TVSeriesDetailsPage;