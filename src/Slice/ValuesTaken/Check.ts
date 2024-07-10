import { createSlice } from '@reduxjs/toolkit'

export const Check = createSlice({
  name: 'Check',
  initialState: {
   value:false
  },
  reducers: {
    valueTaken: (state) => {state.value = true},
  },
})

// Action creators are generated for each case reducer function
export const { valueTaken } = Check.actions

export default Check.reducer