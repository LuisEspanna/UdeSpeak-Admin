import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sideBar',
  initialState: {
    isOpen: true,
  },
  reducers: {
    click: (state) => {
      state.isOpen = !state.isOpen
    }
  },
})

export const { click } = sidebarSlice.actions

export default sidebarSlice.reducer