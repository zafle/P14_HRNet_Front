import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const employeesAdapter = createEntityAdapter({
  selectId: (employee) => employee.id,
})

/**
 * employeesSlice stores all registered employees
 * - Used to display employees in CustomDataTable
 */
export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    addEmployee: employeesAdapter.addOne,
    removeEmployee: employeesAdapter.removeOne,
    updateEmployee: employeesAdapter.updateOne,
  },
})
// creates actions
export const { addEmployee, removeEmployee, updateEmployee } =
  employeesSlice.actions

// creates selectors
export const employeesSelector = employeesAdapter.getSelectors(
  (state) => state.employees
)
