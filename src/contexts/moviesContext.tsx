import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    addToMustWatch: (movie: BaseMovieProps) => void;
    removeFromMustWatch?: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    
    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);
    
    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) =>
            prevFavourites.filter((mId) => mId !== movie.id)
    );
}, []);

const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
};

const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
        if (!prevMustWatch.includes(movie.id)) {
            const updatedMustWatch = [...prevMustWatch, movie.id];
            console.log(updatedMustWatch);
            return updatedMustWatch;
        }
        console.log(prevMustWatch);
        return prevMustWatch;
    });
}, []);

const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
        const updatedMustWatch = prevMustWatch.filter((mId) => mId !== movie.id);
        console.log(updatedMustWatch);
        return updatedMustWatch;
    });
}, []);

return (
    <MoviesContext.Provider
    value={{
        favourites,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
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