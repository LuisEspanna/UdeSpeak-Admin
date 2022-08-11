import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import sidebarSlice from './reducers/sidebarSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        sidebar: sidebarSlice
    },
});