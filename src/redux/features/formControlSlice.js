import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clearDate: false,
}

export const formControlSlice = createSlice({
  name: 'formControl',
  initialState,
  reducers: {
    setClearDate(state, action) {
      state.clearDate = action.payload
    },
  },
})
