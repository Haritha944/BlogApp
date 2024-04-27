import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';


const apiUrl="http://127.0.0.1:8000/category/";
const initialState ={
    categories:[],
    status:'idle',
    error:null,

}
export const fetchCategories =  createAsyncThunk('categories/fetchCategories',async()=>{
    const response =await axios.get(apiUrl);
    return response.data;
})

const categorySlice= createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchCategories.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(fetchCategories.fulfilled, (state, action)=>{
            state.status='succeeded';
            state.categories= action.payload;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status='failed';
            state.error= action.error.message;
        })
    }
})

export const selectAllCategories =(state)=> state.categories.categories;
export const getCategoriesStatus =(state)=> state.categories.status;
export const getCategoriesError =(state)=> state.categories.error;

export default categorySlice.reducer;
