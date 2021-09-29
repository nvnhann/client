import profileAPI from "../API/profileAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
    'user/profile',
    async ()=>{
        const data = await profileAPI.get();
        localStorage.setItem('profile', JSON.stringify(data));
        return data;
    }
)

const profileSlice = createSlice({
    name:'profile',
    initialState: {
      account: JSON.parse(localStorage.getItem('profile')) || {}
    },
    extraReducers:{
        [getProfile.fulfilled]:(state,action)=>{
            state.account = action.payload;
        }
    }
});

const {reducer} = profileSlice;
export default reducer;