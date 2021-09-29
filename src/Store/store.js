import userReducer from './userSlice';
import profileReducer from  './profileSlice';
import loginReducer from './loginpageSlice'
const {configureStore} = require('@reduxjs/toolkit');

const rootReducer = {
    user: userReducer,
    profile: profileReducer,
    login: loginReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;