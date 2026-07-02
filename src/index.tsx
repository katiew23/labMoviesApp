import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TVSeriesPage from "./pages/tvSeriesPage";
import TVSeriesDetailsPage from "./pages/tvSeriesDetailsPage";
import FavouriteTVSeriesPage from "./pages/favouriteTVSeriesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/tv" element={<TVSeriesPage />} />
            <Route path="/tv/favourites" element={<FavouriteTVSeriesPage />} />
            <Route path="/tv/:id" element={<TVSeriesDetailsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
