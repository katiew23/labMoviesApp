import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { getTVGenres } from "../../api/tmdb-api";
import { GenreData } from "../../types/interfaces";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterTVSeriesCardProps {
  onUserInput: (type: string, value: string) => void;
  nameFilter: string;
  genreFilter: string;
  ratingFilter: string;
  yearFilter: string;
  sortBy: string;
}

const FilterTVSeriesCard: React.FC<FilterTVSeriesCardProps> = ({
  nameFilter,
  genreFilter,
  ratingFilter,
  yearFilter,
  sortBy,
  onUserInput,
}) => {
  const { data, error, isPending, isError } = useQuery<GenreData, Error>({
    queryKey: ["tvGenres"],
    queryFn: getTVGenres,
  });
  
  if (isPending) {
    return <Spinner />;
  }
  
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  
  const genres = data?.genres || [];
  
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", e.target.value);
  };
  
  const handleGenreChange = (e: SelectChangeEvent) => {
    onUserInput("genre", e.target.value);
  };
  
  const handleSortChange = (e: SelectChangeEvent) => {
    onUserInput("sort", e.target.value);
  };
  
  const handleRatingChange = (e: SelectChangeEvent) => {
    onUserInput("rating", e.target.value);
  };
  
  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("year", e.target.value);
  };
  return (
    <>
    <Card sx={styles.root} variant="outlined">
    <CardContent>
    <Typography variant="h5" component="h1">
    <FilterAltIcon fontSize="large" />
    Search & Filter TV Series.
    </Typography>
    
    <TextField
    sx={styles.formControl}
    id="filled-search"
    label="Search by name"
    type="search"
    value={nameFilter}
    variant="filled"
    onChange={handleTextChange}
    />
    
    <FormControl sx={styles.formControl}>
    <InputLabel id="genre-label">Genre</InputLabel>
    <Select
    labelId="genre-label"
    id="genre-select"
    value={genreFilter}
    onChange={handleGenreChange}
    >
    {genres.map((genre) => {
      return (
        <MenuItem key={genre.id} value={genre.id}>
        {genre.name}
        </MenuItem>
      );
    })}
    </Select>
    </FormControl>
    
    <FormControl sx={styles.formControl}>
    <InputLabel id="rating-label">Minimum Rating</InputLabel>
    <Select
    labelId="rating-label"
    id="rating-select"
    value={ratingFilter}
    onChange={handleRatingChange}
    >
    <MenuItem value="0">All</MenuItem>
    <MenuItem value="5">5+</MenuItem>
    <MenuItem value="6">6+</MenuItem>
    <MenuItem value="7">7+</MenuItem>
    <MenuItem value="8">8+</MenuItem>
    </Select>
    </FormControl>
    
    <TextField
    sx={styles.formControl}
    id="year-filter"
    label="First Air Year"
    type="text"
    value={yearFilter}
    variant="filled"
    onChange={handleYearChange}
    placeholder="e.g. 2024"
    />
    </CardContent>
    </Card>
    
    <Card sx={styles.root} variant="outlined">
    <CardContent>
    <Typography variant="h5" component="h1">
    <SortIcon fontSize="large" />
    Sort TV Series.
    </Typography>
    
    <FormControl sx={styles.formControl}>
    <InputLabel id="sort-label">Sort By</InputLabel>
    <Select
    labelId="sort-label"
    id="sort-select"
    value={sortBy}
    onChange={handleSortChange}
    >
    <MenuItem value="name">Name A-Z</MenuItem>
    <MenuItem value="rating">Rating High-Low</MenuItem>
    <MenuItem value="date">First Air Date</MenuItem>
    </Select>
    </FormControl>
    </CardContent>
    </Card>
    </>
  );
};

export default FilterTVSeriesCard;