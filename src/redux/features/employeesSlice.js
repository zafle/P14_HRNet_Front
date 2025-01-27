import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const employeesAdapter = createEntityAdapter({
  selectId: (employee) => employee.employeeId,
})

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
})
