import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//const page = 1;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        //* Get Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),
        //* Get Movies by [Type]
        getMovies: builder.query({
            query: ({genreOrCategoryName, page, searchQuery}) => {
                // Get by Search
                if(searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                //* Get Movies by Category
                if(genreOrCategoryName && typeof genreOrCategoryName === 'string'){
                    return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
                //* Get Movies by Genre
                if(genreOrCategoryName && typeof genreOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                
                //* Get Popular Movies
                return `movie/popular?page${page}&api_key=${tmdbApiKey}`
            }
            
            
        }),
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
} = tmdbApi;