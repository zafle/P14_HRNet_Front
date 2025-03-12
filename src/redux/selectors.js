import { createSelector } from '@reduxjs/toolkit'
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

export const getAllEmployees = (state) => employeesSelector.selectAll(state)

export const getNewEmployeeId = createSelector(
  [getAllEmployees],
  (employees) => {
    if (employees.length === 0) {
      return 1
    }
    let allIds = []
    employees.forEach((employee) => allIds.push(employee.id))
    return Math.max(...allIds) + 1
  }
)
