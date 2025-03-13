import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: {
    title: 'First Name',
    width: '130px',
    value: '',
  },
  lastName: {
    title: 'Last Name',
    width: '130px',
    value: '',
  },
  startDate: {
    title: 'Start Date',
    width: '100px',
    value: null,
  },
  department: {
    title: 'Department',
    width: '150px',
    value: '',
  },
  dateOfBirth: {
    title: 'Date of Birth',
    width: '115px',
    value: null,
  },
  street: {
    title: 'Street',
    width: '200px',
    value: '',
  },
  city: {
    title: 'City',
    width: '150px',
    value: '',
  },
  state: {
    title: 'State',
    width: '65px',
    value: '',
  },
  zipCode: {
    title: 'Zip Code',
    width: '90px',
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
