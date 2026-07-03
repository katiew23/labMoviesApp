# Movies App

This is a React, TypeScript and Vite single page application based on the TMDB Movies app developed in the Full Stack 2 labs.

The app uses React Router for navigation, React Query for server state caching, Material UI for the user interface, and the TMDB API for movie data.

## Features Implemented

### Discover Movies

The home page displays discover movies from TMDB.

Users can search and filter movies using multiple criteria:

* Movie title
* Genre
* Minimum rating
* Release year

This feature uses a reusable filtering hook to apply multiple filter conditions to the displayed movie list.

### Upcoming Movies

An Upcoming Movies page was added using the TMDB upcoming movies endpoint.

This page uses React Query to retrieve and cache the server state, reducing repeated HTTP requests when the page is revisited.

### Popular Movies

A Popular Movies page was added using the TMDB popular movies endpoint.

This feature includes:

* A new list view
* A new route
* A navigation menu link
* React Query caching using the `"popular"` query key

### TV Series

A TV Series page was added using the TMDB TV series endpoints.

This feature includes:

* A TV series list page
* TV series detail pages
* TV series favourites
* TV genre filtering
* Multi-criteria search and filtering for TV series
* Sorting by name, rating, and first air date

### Favourites

Users can add movies to a favourites list. Favourite movie IDs are stored in the MoviesContext and displayed on a dedicated Favourites page.

Users can also remove movies from their favourites.

### Favourite TV Series

Users can add TV series to a favourites list.

Favourite TV series IDs are stored in the MoviesContext and displayed on a dedicated Favourite TV Series page. Users can also remove TV series from their favourites.

### Must Watch List

I extended the movie card action system by adding a Must Watch feature.

Users can tag movies using the PlaylistAdd icon. Tagged movies are stored in the MoviesContext and displayed on a dedicated Must Watch page. Users can also remove movies from the Must Watch list.

This feature builds on the favourites pattern from the labs but extends it with:

* A separate Must Watch state array
* An add-to-must-watch action
* A remove-from-must-watch action
* A dedicated Must Watch page
* A new route
* A navigation link

### Reviews

Users can access a review form from the favourites page and submit a review for a selected movie.

## Routing

The app uses React Router for client-side navigation.

Current routes include:

* `/` - Discover Movies
* `/movies/:id` - Movie Details
* `/movies/favourites` - Favourite Movies
* `/movies/upcoming` - Upcoming Movies
* `/movies/popular` - Popular Movies
* `/movies/mustwatch` - Must Watch Movies
* `/reviews/form` - Add Movie Review
* `/reviews/:id` - Movie Review
* `/login` - Login Page
* `/tv` - TV Series
* `/tv/:id` - TV Series Details
* `/tv/favourites` - Favourite TV Series

The favourites and must-watch routes are protected and require the user to be logged in.

## Server State Caching

React Query is used to cache data retrieved from the TMDB API.

Examples include:

* Discover movies
* Upcoming movies
* Popular movies
* Movie details

The app is wrapped in a `QueryClientProvider`, and queries use cache keys such as `"discover"`, `"upcoming"` and `"popular"`.

## Technologies Used

* React
* TypeScript
* Vite
* React Router
* React Query
* Material UI
* TMDB API
* React Context API

### Authentication and Private Routes

The app includes basic authentication using an AuthContext.

Users can log in and log out. Private routes are protected using a PrivateRoute component.

Protected routes include:

* Favourite Movies
* Must Watch Movies
* Favourite TV Series

If a logged-out user tries to access a protected route, they are redirected to the login page.

## Development Notes

The app has been extended from the original lab version by adding new pages, routes, reusable card actions, and context-based movie lists.

Git commit history is being maintained throughout development to show the progress of each feature.
