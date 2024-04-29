import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/blogger/bloggerSlice";
import postReducer from '../features/blogger/SingleBlogSlice';
import categoriesReducer from '../features/categories/categorieSlice';
import authReducer from '../features/authentication/authSlice';
import usersReducer from '../features/users/userSlice'


export const store = configureStore({
  reducer: {
    posts:postsReducer,
    post:postReducer,
    categories:categoriesReducer,
    auth:authReducer,
    users:usersReducer,
  },
});
