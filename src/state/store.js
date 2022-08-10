import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import sidebarSlice from './reducers/sidebarSlice';
import searchSlice from './reducers/searchSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        sidebar: sidebarSlice,
        search: searchSlice
    },
});