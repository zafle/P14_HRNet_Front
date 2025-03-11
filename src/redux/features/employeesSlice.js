import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

// const employeesAdapter = createEntityAdapter()
const employeesAdapter = createEntityAdapter({
  selectId: (employee) => employee.id,
})

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    addEmployee: employeesAdapter.addOne,
    removeEmployee: employeesAdapter.removeOne,
  },
})
// creates actions
export const { addEmployee, removeEmployee } = employeesSlice.actions

// creates selectors
export const employeesSelector = employeesAdapter.getSelectors(
  (state) => state.employees
)
// export const getAllEmployees = (state) => {
//   return state?.employees ? employeesSelectors.selectAll(state.employees) : []
// }
