import { createSlice } from '@reduxjs/toolkit'

export const Login = createSlice({
  name: 'LoginCheck',
  initialState: {
    value: false,
  },
  reducers: {
    setLogin: (state,actions) => {state.value = actions.payload},
  },
})

// Action creators are generated for each case reducer function
export const { setLogin } = Login.actions

export default Login.reducer