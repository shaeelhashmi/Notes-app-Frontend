import { createSlice } from '@reduxjs/toolkit'

export const DarkMode = createSlice({
  name: 'Mode',
  initialState: {
    Mode:false
  },
  reducers: {
    setMode: (state,actions) => {state.Mode = actions.payload},
  },
})

// Action creators are generated for each case reducer function
export const { setMode } = DarkMode.actions

export default DarkMode.reducer