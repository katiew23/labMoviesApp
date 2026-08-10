import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites } = useContext(MoviesContext);
  
  const isFavourite = favourites.some((id) => id === movie.id);
  
  return (
    <Card
    sx={{
      width: "100%",
      maxWidth: 280,
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
      },
    }}
    >
    <Box
    sx={{
      position: "relative",
    }}
    >
    <Link
    to={`/movies/${movie.id}`}
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
    >
    <CardMedia
    component="img"
    image={
      movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : img
    }
    alt={movie.title}
    sx={{
      width: "100%",
      height: 390,
      objectFit: "cover",
    }}
    />
    </Link>
    
    
    
    <Chip
    icon={<StarRateIcon />}
    label={movie.vote_average.toFixed(1)}
    size="small"
    sx={{
      position: "absolute",
      bottom: 10,
      left: 10,
      fontWeight: 600,
      backgroundColor: "rgba(255,255,255,0.92)",
    }}
    />
    
    {isFavourite && (
      <Chip
      label="Favourite"
      size="small"
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        fontWeight: 600,
      }}
      />
    )}
    </Box>
    
    <CardContent
    sx={{
      minHeight: 105,
      px: 2,
      py: 1.5,
    }}
    >
    <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px: 2,
      pb: 1.5,
      mt: "auto",
    }}
    >
    {action(movie)}
    </Box>
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
    {movie.title}
    </Typography>
    
    <Typography
    variant="body2"
    color="text.secondary"
    >
    {movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "Release date unavailable"}
      </Typography>
      </CardContent>
      </Card>
    );
  };
  
  export default MovieCard;