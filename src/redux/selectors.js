import { createSelector } from '@reduxjs/toolkit'
import { employeesSelector } from './features/employeesSlice'

//  ############# EMPLOYEE SLICE SELECTORS #############

/**
 * Returns employeeSlice state
 *
 * @param {Object} state  Global Redux State
 * @param {Object} state.employee Employee State
 * @param {Object} state.employee.firstName
 * @param {Object} state.employee.lastName
 * @param {Object} state.employee.startDate
 * @param {Object} state.employee.department
 * @param {Object} state.employee.dateOfBirth
 * @param {Object} state.employee.street
 * @param {Object} state.employee.city
 * @param {Object} state.employee.state
 * @param {Object} state.employee.zipCode
 *
 * @returns {Object} employeeSlice state
 */
export const getEmployee = (state) => state.employee

export const getFirstName = (state) => state.employee.firstName
export const getLastName = (state) => state.employee.lastName
export const getStartDate = (state) => state.employee.startDate
export const getDepartment = (state) => state.employee.department
export const getDateOfBirth = (state) => state.employee.dateOfBirth
export const getStreet = (state) => state.employee.street
export const getCity = (state) => state.employee.city
export const getState = (state) => state.employee.state
export const getZipCode = (state) => state.employee.zipCode

//  ############# EMPLOYEES SLICE SELECTORS #############

/**
 * Returns an array with all registered employees in employeesSlice
 * - Uses employeesSelector
 *
 * @param {Object} state Global Redux State
 *
 * @returns {Array.<{
 * id: number,
 * firstName: string,
 * lastName: string,
 * startDate: string,
 * department: string,
 * dateOfBirth: string,
 * street: string,
 * city: string,
 * state: string,
 * zipCode: string,
 * }>} Returns an array of all employees
 */
export const getAllEmployees = (state) => employeesSelector.selectAll(state)

/**
 * Retrieves all employees ids and return the max Id + 1
 * - Used in Home to register a new employee with a new ID
 *
 * @returns {number} Returns a new employee ID
 */
export const getNewEmployeeId = createSelector(
  [getAllEmployees],
  (employees) => {
    if (employees.length === 0) {
      return 1
    }
    const allIds = employees.map((employee) => employee.id)
    return Math.max(...allIds) + 1
  }
)

//  ############# FORMCONTROL SLICE SELECTORS #############

/**
 * Returns formControlSlice state
 * - Used in FormDatePicker component to retrieve its 'clearDate' property value
 * - NOTE: the formControlSlice 'setClearDate' action is used in Home
 *
 * @param {Object} state Global Redux State
 *
 * @returns {Object} state.fromControl
 */
export const getFormControl = (state) => state.formControl
