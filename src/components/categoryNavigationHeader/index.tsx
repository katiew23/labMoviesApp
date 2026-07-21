import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AuthContext } from "../../contexts/authContext";

const publicRoutes = [
  "/",
  "/movies/popular",
  "/movies/upcoming",
  "/tv",
];

const authenticatedRoutes = [
  "/",
  "/movies/popular",
  "/movies/upcoming",
  "/movies/favourites",
  "/movies/mustwatch",
  "/tv",
  "/tv/favourites",
];

interface CategoryNavigationHeaderProps {
  title: string;
}

const CategoryNavigationHeader: React.FC<
  CategoryNavigationHeaderProps
> = ({ title }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const routes = isAuthenticated
    ? authenticatedRoutes
    : publicRoutes;

  const currentIndex = routes.indexOf(location.pathname);

  const goPrevious = () => {
    const previousIndex =
      currentIndex <= 0
        ? routes.length - 1
        : currentIndex - 1;

    navigate(routes[previousIndex]);
  };

  const goNext = () => {
    const nextIndex =
      currentIndex === -1 ||
      currentIndex === routes.length - 1
        ? 0
        : currentIndex + 1;

    navigate(routes[nextIndex]);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <IconButton onClick={goPrevious}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
      </Grid>

      <Grid item xs={8}>
        <Typography variant="h4" component="h1" align="center">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <IconButton onClick={goNext}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CategoryNavigationHeader;