import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";

export const login = createAsyncThunk(
    'user/login',
        async (payload) =>{
            const data = await userAPI.login(payload);
            localStorage.setItem('x-access-token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.USER));
            return data.USER
        }
    )

const userSlice = createSlice({
    name: 'user',
    initialState:{
        current: JSON.parse(localStorage.getItem('user')) || {},

    },
    reducers:{
        logout(state){
            state.current = {};
            localStorage.removeItem('user');
            localStorage.removeItem('profile');
        }
    },
    extraReducers:{
        [login.fulfilled] : (state, action) =>{
            state.current = action.payload;
        }
    }
});

const {actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;