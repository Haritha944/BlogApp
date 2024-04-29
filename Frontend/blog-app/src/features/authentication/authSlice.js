import axios from "axios";
import cookies from "cookies-js"
import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";

const userCookie = cookies.get('user');
const accessTokenCookie = cookies.get('accessToken');
const accessRefreshTokenCookie = cookies.get('refreshToken');

let user=null;
let accessToken=null;
let refreshToken=null;
if(userCookie && accessTokenCookie && accessRefreshTokenCookie) {
    try{
        user=JSON.parse(userCookie);
        accessToken=accessTokenCookie;
        refreshToken = accessRefreshTokenCookie;
    }catch(e){
        console.log('There is an error')
    }
}

const initialState={
    user,
    accessToken,
    refreshToken,
    isLoading:false,
    error:null,
    isAuthenticated: false,
};

const apiUrl= 'http://127.0.0.1:8000';


export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducer:{
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
          },
          loginSuccess: (state, action) => {
            const timers = 60 * 86400;
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = true;
            cookies.set("refreshToken", refreshToken, { expires: timers });
            cookies.set("user", JSON.stringify(user), { expires: timers });
            cookies.set("accessToken", accessToken, { expires: timers });
          },
          loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          },
          logoutSuccess: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken=null;
            state.isAuthenticated = false;
            cookies.expire("user");
            cookies.expire("accessToken");
            cookies.expire("refreshToken");
          },
    },
});

export const {loginStart,loginFailure,loginSuccess,logoutSuccess}=authSlice.actions;

export const login = (credentials) => async(dispatch)=>{
    try {
        const response= await axios.post(
            `${apiUrl}/token/`,credentials
        );
        const accessToken=response.data.access;
        const refreshToken = response.data.refresh;
        const decodedToken = jwtDecode(accessToken);
        const user = decodedToken;
        dispatch(loginSuccess({user,accessToken,refreshToken}));
        const timer=240;
        const  intervalId= setInterval(()=>{
            dispatch(refreshAccessToken());
        },timer*1000);
        dispatch({type:"SET_INTERVAL_ID",payload: intervalId});
    } catch(error){
        const message = error.response?.data?.detail || "An unknown error occurred.";
        dispatch(loginFailure(message));
        
        throw error;
    }
};
export const logout = () => (dispatch) => {
    dispatch(logoutSuccess());
  };

export const refreshAccessToken = () => async(dispatch,getState)=>{
    try{
        const newrefreshToken = cookies.get('refreshToken');
        const response = await axios.post(
            `${apiUrl}/token/refresh/`,
            { refresh: newrefreshToken }
        );
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const decodedToken = jwtDecode(accessToken);
        const user = decodedToken;

        dispatch(loginSuccess({user,accessToken,refreshToken}));
    }catch(error){
        dispatch(logout());
    }
}

export const selectIsAuthenticated = (state) => state.auth.accessToken !== null;
export default authSlice.reducer;