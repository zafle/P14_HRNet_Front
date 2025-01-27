import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  startDate: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  department: '',
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setFirstName(state, action) {
      state.firstName = action.payload
      // console.log('firstname action.payload :', action.payload)
    },
    setLastName(state, action) {
      state.lastName = action.payload
    },
    setStartDate(state, action) {
      state.startDate = action.payload
    },
    setDateOfBirth(state, action) {
      state.dateOfBirth = action.payload
    },
    setStreet(state, action) {
      state.street = action.payload
    },
    setCity(state, action) {
      state.city = action.payload
    },
    setState(state, action) {
      state.state = action.payload
    },
    setZipCode(state, action) {
      state.zipCode = action.payload
    },
    setDepartment(state, action) {
      state.department = action.payload
    },
  },
})
