import { createSlice } from '@reduxjs/toolkit'

/**
 * formControlSlice is used to reset FormDatePicker component
 * - read FormDatePickerStateManagement JSDoc for more infos
 */

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
