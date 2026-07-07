import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, BaseTVProps, Review } from "../types/interfaces";
import { supabase } from "../supabaseClient";

interface MovieContextInterface {
    favourites: number[];
    favouriteTVSeries: number[];
    mustWatch: number[];
    addToFavourites: (movie?: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addToFavouritesTVSeries: (tvSeries: BaseTVProps) => void;
    removeFromFavouritesTVSeries: (tvSeries: BaseTVProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    addToMustWatch: (movie: BaseMovieProps) => void;
    removeFromMustWatch?: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    favouriteTVSeries: [],
    mustWatch: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToFavouritesTVSeries: () => {},
    removeFromFavouritesTVSeries: () => {},
    addReview: () => {},
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
};

export const MoviesContext =
React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>([]);
    
    useEffect(() => {
        const loadFavourites = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            
            if (!user) {
                setFavourites([]);
                return;
            }
            
            const { data, error } = await supabase
            .from("Favourites")
            .select("movie_id")
            .eq("user_id", user.id);
            
            if (error) {
                console.error("Error loading favourites:", error.message);
                return;
            }
            
            setFavourites(data.map((favourite) => favourite.movie_id));
        };
        
        loadFavourites();
        
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                loadFavourites();
            } else {
                setFavourites([]);
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
            
            const { error } = await supabase.from("Favourites").insert({
                user_id: user.id,
                movie_id: movie.id,
            });
            
            if (error) {
                console.error("Error adding favourite:", error.message);
                return;
            }
            
            setFavourites((previousFavourites) => {
                if (!previousFavourites.includes(movie.id)) {
                    return [...previousFavourites, movie.id];
                }
                
                return previousFavourites;
            });
        },
        []
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
                previousFavourites.filter((movieId) => movieId !== movie.id)
        );
    },
    []
);

const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
};

const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
        if (!prevMustWatch.includes(movie.id)) {
            return [...prevMustWatch, movie.id];
        }
        
        return prevMustWatch;
    });
}, []);

const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) =>
        prevMustWatch.filter((mId) => mId !== movie.id)
);
}, []);

const addToFavouritesTVSeries = useCallback(
    (tvSeries?: BaseTVProps) => {
        if (!tvSeries) {
            console.log("No TV series passed to addToFavouritesTVSeries");
            return;
        }
        
        setFavouriteTVSeries((prevFavourites) => {
            if (!prevFavourites.includes(tvSeries.id)) {
                return [...prevFavourites, tvSeries.id];
            }
            
            return prevFavourites;
        });
    },
    []
);

const removeFromFavouritesTVSeries = useCallback(
    (tvSeries: BaseTVProps) => {
        setFavouriteTVSeries((prevFavourites) =>
            prevFavourites.filter((tId) => tId !== tvSeries.id)
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