import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, BaseTVProps, Review } from "../types/interfaces";
import { supabase } from "../supabaseClient";

interface MovieContextInterface {
  favourites: number[];
  favouriteTVSeries: number[];
  mustWatch: number[];
  addToFavourites: (movie?: BaseMovieProps) => Promise<void>;
  removeFromFavourites: (movie: BaseMovieProps) => Promise<void>;
  addToFavouritesTVSeries: (tvSeries?: BaseTVProps) => Promise<void>;
  removeFromFavouritesTVSeries: (
    tvSeries: BaseTVProps
  ) => Promise<void>;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  addToMustWatch: (movie: BaseMovieProps) => Promise<void>;
  removeFromMustWatch: (movie: BaseMovieProps) => Promise<void>;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  favouriteTVSeries: [],
  mustWatch: [],
  addToFavourites: async () => {},
  removeFromFavourites: async () => {},
  addToFavouritesTVSeries: async () => {},
  removeFromFavouritesTVSeries: async () => {},
  addReview: () => {},
  addToMustWatch: async () => {},
  removeFromMustWatch: async () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>(
    []
  );

  useEffect(() => {
    const loadUserLists = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFavourites([]);
        setMustWatch([]);
        setFavouriteTVSeries([]);
        return;
      }

      const [favouritesResult, mustWatchResult, tvFavouritesResult] =
        await Promise.all([
          supabase
            .from("Favourites")
            .select("movie_id")
            .eq("user_id", user.id),

          supabase
            .from("mustWatch")
            .select("movie_id")
            .eq("user_id", user.id),

          supabase
            .from("FavouriteTVSeries")
            .select("tv_id")
            .eq("user_id", user.id),
        ]);

      if (favouritesResult.error) {
        console.error(
          "Error loading favourites:",
          favouritesResult.error.message
        );
      } else {
        setFavourites(
          favouritesResult.data.map((item) => item.movie_id)
        );
      }

      if (mustWatchResult.error) {
        console.error(
          "Error loading must watch:",
          mustWatchResult.error.message
        );
      } else {
        setMustWatch(
          mustWatchResult.data.map((item) => item.movie_id)
        );
      }

      if (tvFavouritesResult.error) {
        console.error(
          "Error loading TV favourites:",
          tvFavouritesResult.error.message
        );
      } else {
        setFavouriteTVSeries(
          tvFavouritesResult.data.map((item) => item.tv_id)
        );
      }
    };

    loadUserLists();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserLists();
      } else {
        setFavourites([]);
        setMustWatch([]);
        setFavouriteTVSeries([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToFavourites = useCallback(
    async (movie?: BaseMovieProps) => {
      if (!movie) {
        console.log("No movie passed to addToFavourites");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      if (favourites.includes(movie.id)) {
        return;
      }

      const { error } = await supabase.from("Favourites").insert({
        user_id: user.id,
        movie_id: movie.id,
      });

      if (error) {
        console.error("Error adding favourite:", error.message);
        return;
      }

      setFavourites((previousFavourites) => [
        ...previousFavourites,
        movie.id,
      ]);
    },
    [favourites]
  );

  const removeFromFavourites = useCallback(
    async (movie: BaseMovieProps) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      const { error } = await supabase
        .from("Favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movie.id);

      if (error) {
        console.error("Error removing favourite:", error.message);
        return;
      }

      setFavourites((previousFavourites) =>
        previousFavourites.filter(
          (movieId) => movieId !== movie.id
        )
      );
    },
    []
  );

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews((previousReviews) => ({
      ...previousReviews,
      [movie.id]: review,
    }));
  };

  const addToMustWatch = useCallback(
    async (movie: BaseMovieProps) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      if (mustWatch.includes(movie.id)) {
        return;
      }

      const { error } = await supabase.from("mustWatch").insert({
        user_id: user.id,
        movie_id: movie.id,
      });

      if (error) {
        console.error(
          "Error adding to must watch:",
          error.message
        );
        return;
      }

      setMustWatch((previousMustWatch) => [
        ...previousMustWatch,
        movie.id,
      ]);
    },
    [mustWatch]
  );

  const removeFromMustWatch = useCallback(
    async (movie: BaseMovieProps) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      const { error } = await supabase
        .from("mustWatch")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movie.id);

      if (error) {
        console.error(
          "Error removing from must watch:",
          error.message
        );
        return;
      }

      setMustWatch((previousMustWatch) =>
        previousMustWatch.filter(
          (movieId) => movieId !== movie.id
        )
      );
    },
    []
  );

  const addToFavouritesTVSeries = useCallback(
    async (tvSeries?: BaseTVProps) => {
      if (!tvSeries) {
        console.log(
          "No TV series passed to addToFavouritesTVSeries"
        );
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      if (favouriteTVSeries.includes(tvSeries.id)) {
        return;
      }

      const { error } = await supabase
        .from("FavouriteTVSeries")
        .insert({
          user_id: user.id,
          tv_id: tvSeries.id,
        });

      if (error) {
        console.error(
          "Error adding TV favourite:",
          error.message
        );
        return;
      }

      setFavouriteTVSeries((previousFavourites) => [
        ...previousFavourites,
        tvSeries.id,
      ]);
    },
    [favouriteTVSeries]
  );

  const removeFromFavouritesTVSeries = useCallback(
    async (tvSeries: BaseTVProps) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User must be logged in.");
        return;
      }

      const { error } = await supabase
        .from("FavouriteTVSeries")
        .delete()
        .eq("user_id", user.id)
        .eq("tv_id", tvSeries.id);

      if (error) {
        console.error(
          "Error removing TV favourite:",
          error.message
        );
        return;
      }

      setFavouriteTVSeries((previousFavourites) =>
        previousFavourites.filter(
          (tvId) => tvId !== tvSeries.id
        )
      );
    },
    []
  );

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        favouriteTVSeries,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        addToFavouritesTVSeries,
        removeFromFavouritesTVSeries,
        addReview,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;