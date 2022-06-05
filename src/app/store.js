import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import { tmdbApi } from "../services/TMDB";
import userReducer from '../features/auth';

export default configureStore ({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      currentGenreOrCategory: genreOrCategoryReducer,
      user: userReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
