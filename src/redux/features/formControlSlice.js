import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clearDate: false,
}

/**
 * formControlSlice is used for the FormDatePicker component
 * - the clearDate state allows to notify FormDatePicker that the date has to be reset
 * - read FormDatePickerStateManagement JSDoc for more infos
 */
export const formControlSlice = createSlice({
  name: 'formControl',
  initialState,
  reducers: {
    setClearDate(state, action) {
      state.clearDate = action.payload
    },
  },
})
