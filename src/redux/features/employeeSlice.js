import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: {
    title: 'First Name',
    value: '',
  },
  lastName: {
    title: 'Last Name',
    value: '',
  },
  startDate: {
    title: 'Start Date',
    value: null,
  },
  department: {
    title: 'Department',
    value: '',
  },
  dateOfBirth: {
    title: 'Date of Birth',
    value: null,
  },
  street: {
    title: 'Street',
    value: '',
  },
  city: {
    title: 'City',
    value: '',
  },
  state: {
    title: 'State',
    value: '',
  },
  zipCode: {
    title: 'Zip Code',
    value: '',
  },
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setFirstName(state, action) {
      state.firstName.value = action.payload
    },
    setLastName(state, action) {
      state.lastName.value = action.payload
    },
    setStartDate(state, action) {
      state.startDate.value = action.payload
    },
    setDateOfBirth(state, action) {
      state.dateOfBirth.value = action.payload
    },
    setStreet(state, action) {
      state.street.value = action.payload
    },
    setCity(state, action) {
      state.city.value = action.payload
    },
    setState(state, action) {
      state.state.value = action.payload
    },
    setZipCode(state, action) {
      state.zipCode.value = action.payload
    },
    setDepartment(state, action) {
      state.department.value = action.payload
    },
    clearEmployee() {
      return {
        ...initialState,
      }
    },
  },
})
