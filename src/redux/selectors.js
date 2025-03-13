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
 * @param {string} state.employee.[key].title Title used in EmployeeList CustomDataTable header cells
 * @param {string} state.employee.[key].width Width used in EmployeeList CustomDataTable to set maxWidth columns
 * @param {string} state.employee.[key].value Property value used in Home form and saved in employeesSlice
 *
 * @returns {Object} employeeSlice state
 */
export const getEmployee = (state) => state.employee

export const getFirstName = (state) => state.employee.firstName.value
export const getLastName = (state) => state.employee.lastName.value
export const getStartDate = (state) => state.employee.startDate.value
export const getDepartment = (state) => state.employee.department.value
export const getDateOfBirth = (state) => state.employee.dateOfBirth.value
export const getStreet = (state) => state.employee.street.value
export const getCity = (state) => state.employee.city.value
export const getState = (state) => state.employee.state.value
export const getZipCode = (state) => state.employee.zipCode.value

/**
 * Returns the 'value' property for each employeeSlice property [key]
 *
 * @returns {Array.<{[key]: string }>} Property value used in Home form and saved in employeesSlice
 */
// export const getEmployeeValues = createSelector([getEmployee], (employee) => {
//   return Object.entries(employee).reduce((acc, [key, value]) => {
//     acc[key] = value.value
//     return acc
//   }, {})
// })

/**
 * Returns the 'title' and 'width' properties for each employeeSlice property [key]
 * - Title used in EmployeeList CustomDataTable header cells
 * - Width used in EmployeeList CustomDataTable to set maxWidth columns
 *
 * @returns {Array.<{[key]: {title: string, width: string }}>}
 *
 */
export const getEmployeeCellData = createSelector([getEmployee], (employee) => {
  return Object.entries(employee).reduce((acc, [key, value]) => {
    acc[key] = { title: value.title, width: value.width }
    return acc
  }, {})
})

/**
 * Returns all the employeeSlice properties strings
 * - Used in CustomDataTable filter functionnality
 *
 * @returns {Array.<string>}
 */
export const getEmployeeProperties = createSelector(
  [getEmployee],
  (employee) => {
    return Object.keys(employee)
  }
)

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
