import { createSlice } from '@reduxjs/toolkit'
/*

*/
const exampleUser = {
  type: "admin",
  name: "Luis Angel",
  img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false
  },
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    }
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer