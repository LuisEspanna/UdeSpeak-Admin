import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    index: 0,
    routes: ['/dashboard']
  },
  reducers: {
    addNavigation: (state, action) => {
      state.index = state.routes.length;
      state.routes = [...state.routes, action.payload];
    },
    goNext: (state) => {
      state.index = state.index < state.routes.length ? state.index+1 : state.index;
    },
    goPrev: (state) => {
      state.index = state.index > 0 ? state.index-1 : state.index;
    },
    clear : (state) => {
      state.routes = [];
      state.index = 0;
    }
  },
})

export const { addNavigation, goNext, goPrev, clear } = userSlice.actions

export default userSlice.reducer