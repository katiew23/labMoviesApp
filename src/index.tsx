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
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import PrivateRoute from "./components/privateRoute";
import { supabase } from "./supabaseClient";

supabase.auth.getSession().then(({ data, error }) => {
  console.log("Supabase session:", data.session);
  console.log("Supabase error:", error);
});

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
        <AuthContextProvider>
          <MoviesContextProvider>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/movies/favourites" element={<PrivateRoute><FavouriteMoviesPage /></PrivateRoute>} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/mustwatch" element={<PrivateRoute><MustWatchMoviesPage /></PrivateRoute>} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/tv" element={<TVSeriesPage />} />
              <Route path="/tv/favourites" element={<PrivateRoute><FavouriteTVSeriesPage /></PrivateRoute>} />
              <Route path="/tv/:id" element={<TVSeriesDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
