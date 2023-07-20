import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../modules/user/redux/user-slice';
// App State Store here
export const store = configureStore({
    reducer:{userSlice: userSlice}
})