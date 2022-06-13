import { createSlice } from '@reduxjs/toolkit'

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: {
    open: true,
  },
  reducers: {
    open: (state) => {
      state.open = true
    },
    close: (state) => {
      state.open = false
    }
  },
})

export const { open, close } = sideBarSlice.actions

export default sideBarSlice.reducer