import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
})

export const { setIsLoading } = loadingSlice.actions

export default loadingSlice.reducer