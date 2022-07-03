import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false
  },
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    }
  },
})

export const { setUser, setPermission } = userSlice.actions

export default userSlice.reducer