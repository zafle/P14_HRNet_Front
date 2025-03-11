import { employeesSelector } from './features/employeesSlice'

export const getEmployee = (state) => state.employee

export const getEmployeeValues = (state) => {
  return Object.entries(state.employee).reduce((acc, [key, value]) => {
    acc[key] = value.value
    return acc
  }, {})
}

export const getEmployeeTitles = (state) => {
  return Object.entries(state.employee).reduce((acc, [key, value]) => {
    acc[key] = value.title
    return acc
  }, {})
}

export const getEmployeeProperties = (state) => {
  return Object.keys(state.employee)
}

export const getFormControl = (state) => state.formControl

export const allEmployees = (state) =>
  employeesSelector.selectAll(state.employees)
