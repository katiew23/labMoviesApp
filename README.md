# Movies App

This is a React, TypeScript and Vite single page application based on the TMDB Movies app developed in the Full Stack 2 labs.

The app uses React Router for navigation, TanStack React Query for server state caching, Material UI for the user interface, Supabase for authentication and persistence, and the TMDB API for movie and TV series data.

## Features Implemented

### Discover Movies

The home page displays discover movies from TMDB.

Users can search and filter movies using multiple criteria:

* Movie title
* Genre
* Minimum rating
* Release year
* Sorting options

This feature uses a reusable filtering hook to apply multiple filter conditions to the displayed movie list.

The Discover Movies page also includes pagination using TanStack React Query.

### Upcoming Movies

An Upcoming Movies page was added using the TMDB upcoming movies endpoint.

This page uses TanStack React Query to retrieve and cache the server state, reducing repeated HTTP requests when the page is revisited.

### Popular Movies

A Popular Movies page was added using the TMDB popular movies endpoint.

This feature includes:

* A new list view
* A new route
* A navigation menu link
* TanStack React Query caching using the `"popular"` query key

### TV Series

A TV Series page was added using the TMDB TV series endpoints.

This feature includes:

* A TV series list page
* TV series detail pages
* A parameterised TV series route
* TV series favourites
* TV genre filtering
* Multi-criteria search and filtering for TV series
* Sorting by name, rating, and first air date
* Pagination
* TanStack React Query caching

A reusable TV series list template was created to provide consistent styling across the main TV Series page and the Favourite TV Series page.

### Favourites

Authenticated users can add movies to a favourites list.

Favourite movies are stored in Supabase against the authenticated user's ID and displayed on a dedicated Favourite Movies page.

Users can:

* Add movies to favourites
* Remove movies from favourites
* Move favourite movies up or down
* Save the selected order in Supabase
* Reload the saved order after refreshing or logging back in

The ordered favourites functionality extends the original favourites pattern from the labs by adding persistent user-controlled ordering.

### Favourite TV Series

Authenticated users can add TV series to a favourites list.

Favourite TV series are stored in Supabase against the authenticated user's ID and displayed on a dedicated Favourite TV Series page.

Users can:

* Add TV series to favourites
* Remove TV series from favourites
* Move favourite TV series up or down
* Save the selected order in Supabase
* Reload the saved order after refreshing or logging back in

### Must Watch List

I extended the movie card action system by adding a Must Watch feature.

Authenticated users can tag movies using the PlaylistAdd icon. Tagged movies are stored in Supabase against the authenticated user's ID and displayed on a dedicated Must Watch page.

Users can also remove movies from the Must Watch list.

This feature builds on the favourites pattern from the labs but extends it with:

* A separate Must Watch state array
* Supabase persistence
* An add-to-must-watch action
* A remove-from-must-watch action
* A dedicated Must Watch page
* A protected route
* A navigation link

### Reviews

Users can access a review form from the favourites page and submit a review for a selected movie.

### Authentication

The app uses Supabase Authentication.

Users can:

* Create an account
* Log in
* Log out
* Maintain an authenticated session after refreshing the application
* Access user-specific favourites and Must Watch data

The authentication state is managed through an AuthContext which listens for Supabase authentication state changes.

### Private and Public Routes

The app includes both public and private routes.

Public routes include:

* Discover Movies
* Popular Movies
* Upcoming Movies
* Movie Details
* TV Series
* TV Series Details
* Login
* Sign Up

Protected routes include:

* Favourite Movies
* Must Watch Movies
* Favourite TV Series

If a logged-out user tries to access a protected route, the PrivateRoute component redirects them to the login page.

### Authenticated Navigation

The site navigation changes depending on whether the user is logged in.

Logged-out users can access the public movie and TV series pages.

Logged-in users can additionally access:

* Favourite Movies
* Must Watch Movies
* Favourite TV Series
* Logout

A reusable category navigation header was also created. Its left and right arrows allow users to move between the available content categories.

The available routes used by the category navigation depend on the user's authentication state.

## Routing

The app uses React Router for client-side navigation.

Current routes include:

* `/` - Discover Movies
* `/home` - Discover Movies
* `/movies/:id` - Movie Details
* `/movies/favourites` - Favourite Movies
* `/movies/upcoming` - Upcoming Movies
* `/movies/popular` - Popular Movies
* `/movies/mustwatch` - Must Watch Movies
* `/reviews/form` - Add Movie Review
* `/reviews/:id` - Movie Review
* `/login` - Login Page
* `/signup` - Sign Up Page
* `/tv` - TV Series
* `/tv/:id` - TV Series Details
* `/tv/favourites` - Favourite TV Series

The favourites and Must Watch routes are protected and require the user to be logged in.

## Pagination

Pagination is implemented on the main data-listing pages.

The current page number is included in the TanStack React Query cache key so that each page of results can be cached separately.

Pagination controls allow users to move between result pages while retaining the previous data during loading.

## Server State Caching

TanStack React Query is used to retrieve and cache data from the TMDB API.

Examples include:

* Discover movies
* Upcoming movies
* Popular movies
* Movie details
* TV series
* TV series details
* Movie genres
* TV genres

The app is wrapped in a `QueryClientProvider`.

Queries use cache keys such as:

* `"discover"`
* `"upcoming"`
* `"popular"`
* `"movie"`
* `"tvSeries"`

## Supabase Persistence

Supabase is used to persist user-specific application data.

The following lists are stored in Supabase:

* Favourite movies
* Favourite TV series
* Must Watch movies
* Favourite movie positions
* Favourite TV series positions

Each database record is associated with the authenticated user's ID.

Row Level Security policies ensure that users can only read, add, update, or remove their own records.

The saved data is loaded when the user logs in and cleared from the local context when the user logs out.

## Ordered Favourites

Movie and TV series favourites can be reordered using up and down controls.

When the user changes the order:

1. A new ordered array of IDs is created.
2. The relevant context state is updated.
3. Each item's position is updated in Supabase.
4. The saved positions are used when the favourites are loaded again.

Existing favourites without a saved position are initially ordered using their creation date.

## Storybook

Storybook support is included for reusable application components.

Stories have been created or updated for movie and TV series components, including list, card, detail, header, and filtering components.

Storybook allows these components to be viewed and tested independently from the main application.

## Technologies Used

* React
* TypeScript
* Vite
* React Router
* TanStack React Query
* Material UI
* Supabase Authentication
* Supabase Database
* TMDB API
* React Context API
* Storybook

## Development Notes

The app has been extended from the original lab version by adding new pages, routes, reusable templates, reusable navigation, authentication, protected routes, TV series functionality, pagination, multi-criteria filtering, ordered favourites, and Supabase persistence.

Git commit history has been maintained throughout development to show the implementation and progress of each feature.
