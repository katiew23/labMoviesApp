import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { MovieDetailsProps, Review } from "../../types/interfaces";
import Spinner from "../spinner";

const styles = {
  table: {
    minWidth: 550,
  },
};

const MovieReviews: React.FC<MovieDetailsProps> = (movie) => {
  const {
    data: reviews,
    error,
    isPending,
    isError,
  } = useQuery<Review[], Error>({
    queryKey: ["reviews", movie.id],
    queryFn: () => getMovieReviews(movie.id),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((r: Review) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>

              <TableCell>{excerpt(r.content)}</TableCell>

              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;
