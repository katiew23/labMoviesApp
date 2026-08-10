import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from "../../images/film-poster-placeholder.png";
import { BaseTVProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

interface TVSeriesCardProps {
  series: BaseTVProps;
  action: (s: BaseTVProps) => React.ReactNode;
}

const TVSeriesCard: React.FC<TVSeriesCardProps> = ({ series, action }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 280,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Link
          to={`/tv/${series.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardMedia
            component="img"
            image={
              series.poster_path
                ? `https://image.tmdb.org/t/p/w500/${series.poster_path}`
                : img
            }
            alt={series.name}
            sx={{
              width: "100%",
              height: 390,
              objectFit: "cover",
            }}
          />
        </Link>

        <Chip
          icon={<StarRateIcon />}
          label={series.vote_average.toFixed(1)}
          size="small"
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            fontWeight: 600,
            backgroundColor: "rgba(255,255,255,0.92)",
          }}
        />
      </Box>

      <CardContent
        sx={{
          minHeight: 105,
          px: 2,
          py: 1.5,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {series.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {series.first_air_date
            ? new Date(series.first_air_date).getFullYear()
            : "Air date unavailable"}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          pb: 1.5,
          mt: "auto",
        }}
      >
        {action(series)}
      </Box>
    </Card>
  );
};

export default TVSeriesCard;