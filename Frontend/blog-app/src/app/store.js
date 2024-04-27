import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/blogger/bloggerSlice";
import postReducer from '../features/blogger/SingleBlogSlice';
import categoriesReducer from '../features/categories/categorieSlice'


export const store = configureStore({
  reducer: {
    posts:postsReducer,
    post:postReducer,
    categories:categoriesReducer,
  },
});
