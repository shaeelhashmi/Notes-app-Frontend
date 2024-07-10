import { createSlice } from '@reduxjs/toolkit'

export const userName = createSlice({
  name: 'getName',
  initialState: {
    name:""
  },
  reducers: {
    setName: (state,actions) => {state.name = actions.payload},
  },
})

// Action creators are generated for each case reducer function
export const { setName } = userName.actions

export default userName.reducer