import {createSlice} from "@reduxjs/toolkit";


const loginSlice = createSlice({
    name:'loginpage',
    initialState: {
        loginpage: 'LOGIN'
    },
   reducers: {
        loginpage(state){
            state.loginpage = "LOGIN"
        },
       registerpage(state){
            state.loginpage="REGISTER"
       }
   }

});

const {actions, reducer} = loginSlice;
export const {loginpage, registerpage} = actions;
export default reducer;