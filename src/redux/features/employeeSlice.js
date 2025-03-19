import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  startDate: null,
  department: '',
  dateOfBirth: null,
  street: '',
  city: '',
  state: '',
  zipCode: '',
}

/**
 * employeeSlice stores values from Home form Create Employee
 */
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setFirstName(state, action) {
      state.firstName = action.payload
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
    editEmployee(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    clearEmployee() {
      console.log('employee cleared')
      return {
        ...initialState,
      }
    },
  },
})
