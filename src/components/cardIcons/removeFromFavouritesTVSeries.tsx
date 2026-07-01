import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseTVProps } from "../../types/interfaces";

const RemoveFromFavouritesTVSeries: React.FC<BaseTVProps> = (tvSeries) => {
    const context = useContext(MoviesContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromFavouritesTVSeries(tvSeries);
    };

    return (
        <IconButton
            aria-label="remove from favorites"  
            onClick={onUserRequest}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default RemoveFromFavouritesTVSeries;