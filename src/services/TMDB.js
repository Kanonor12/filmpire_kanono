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
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //* Get Movies by Category
                if(genreOrCategoryName && typeof genreOrCategoryName === 'string'){
                    return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                
                //* Get Movies by Genre
                if(genreOrCategoryName && typeof genreOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                } else{
                    //* Get Popular Movies
                return `movie/popular?page${page}&api_key=${tmdbApiKey}`;
                }
            
                
            }           
        }),
        //* Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),
        //* Get User Specific Lists
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),

        getRecommendations: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),
        //* Get Actor's Details
        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
        }),
        //* Get Movie by Actor
        getMovieByActorId: builder.query({
            query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        })
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMovieByActorIdQuery,
    useGetListQuery,
} = tmdbApi;