import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import sidebarSlice from './reducers/sidebarSlice';
import navigationSlice from './reducers/navigationSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        sidebar: sidebarSlice,
        navigation: navigationSlice
    },
});