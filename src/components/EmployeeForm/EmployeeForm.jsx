import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Slice
import { employeeSlice } from '../../redux/features/employeeSlice'
// Components
import { FormInputMemo } from '../FormInput/FormInput'
import { FormDatePickerStateManagerMemo } from '../FormDatePickerStateManager/FormDatePickerStateManager'
import { FormSelectMemo } from '../FormSelect/FormSelect'
// Data
import { DEPARTMENTS, STATES } from '../../data/employeeForm'
// Selectors
import {
  getCity,
  getDateOfBirth,
  getDepartment,
  getFirstName,
  getLastName,
  getStartDate,
  getState,
  getStreet,
  getZipCode,
} from '../../redux/selectors'
// Util
import { format } from 'date-fns'
// PropTypes
import PropTypes from 'prop-types'
// scss
import variables from '../../styles/_export.module.scss'
import './_EmployeeForm.scss'

/**
 * Displays a form to create or update employee
 * - used in Home and EditEmployee components
 *
 * @param {function} onSubmitForm function to call on submit form
 * @param {type} formType 'create' | 'update'
 *
 * @returns {React.ReactElement} the employee form
 */
export default function EmployeeForm({ onSubmitForm, formType }) {
  // Get scss variables
  const { lightThirdColor } = variables

  const dispatch = useDispatch()

  const firstName = useSelector(getFirstName)
  const lastName = useSelector(getLastName)
  const street = useSelector(getStreet)
  const city = useSelector(getCity)
  const zipCode = useSelector(getZipCode)
  const dateOfBirth = useSelector(getDateOfBirth)
  const startDate = useSelector(getStartDate)
  const state = useSelector(getState)
  const department = useSelector(getDepartment)

  // ############### DATE PICKERS UTILS ###############
  const formatDate = (date) => {
    const formatedDate = format(new Date(date), 'MM/dd/yyyy')
    if (formatedDate === '01/01/1970') {
      return ''
    }
    return formatedDate
  }

  const today = useMemo(() => new Date(), [])

  // ############### HANDLE SUBMIT FORM ###############
  const handleSubmitForm = (e) => {
    e.preventDefault()
    const employee = {
      firstName,
      lastName,
      startDate: formatDate(startDate),
      department,
      dateOfBirth: formatDate(dateOfBirth),
      street,
      city,
      state,
      zipCode,
    }
    onSubmitForm(employee)
  }

  // ############### HANDLE CHANGE FORM ###############

  const handleFirstNameChange = useCallback(
    (e) => {
      dispatch(employeeSlice.actions.setFirstName(e.target.value))
    },
    [dispatch]
  )
  const handleLastNameChange = useCallback(
    (e) => {
      dispatch(employeeSlice.actions.setLastName(e.target.value))
    },
    [dispatch]
  )
  const handleDateOfBirthChange = useCallback(
    (date) => {
      dispatch(employeeSlice.actions.setDateOfBirth(date))
    },
    [dispatch]
  )
  const handleStartDateChange = useCallback(
    (date) => {
      dispatch(employeeSlice.actions.setStartDate(date))
    },
    [dispatch]
  )

  const handleDepartmentChange = useCallback(
    (option) => {
      dispatch(employeeSlice.actions.setDepartment(option))
    },
    [dispatch]
  )
  const handleStreetChange = useCallback(
    (e) => {
      dispatch(employeeSlice.actions.setStreet(e.target.value))
    },
    [dispatch]
  )
  const handleCityChange = useCallback(
    (e) => {
      dispatch(employeeSlice.actions.setCity(e.target.value))
    },
    [dispatch]
  )
  const handleStateChange = useCallback(
    (option) => {
      dispatch(employeeSlice.actions.setState(option))
    },
    [dispatch]
  )
  const handleZipCodeChange = useCallback(
    (e) => {
      dispatch(employeeSlice.actions.setZipCode(e.target.value))
    },
    [dispatch]
  )
  return (
    <form className="employeeForm" onSubmit={handleSubmitForm}>
      <div className="employeeForm__insideContainer">
        <div className="employeeForm__block">
          <div className="employeeForm__block--insideContainer">
            <FormInputMemo
              label="First Name"
              onChange={handleFirstNameChange}
              inputValue={firstName}
              background={true}
            />
            <FormInputMemo
              label="Last Name"
              onChange={handleLastNameChange}
              inputValue={lastName}
              background={true}
            />

            <FormDatePickerStateManagerMemo
              label="Date of Birth"
              date={dateOfBirth}
              dispatchDate={handleDateOfBirthChange}
              maxDate={today}
            />
            <FormDatePickerStateManagerMemo
              label="Start Date"
              date={startDate}
              dispatchDate={handleStartDateChange}
            />
            <FormSelectMemo
              label="Department"
              options={DEPARTMENTS}
              onChange={handleDepartmentChange}
              selectedOption={department}
              backgroundColor={lightThirdColor}
              formType={formType}
            />
          </div>
        </div>
        <div className="employeeForm__block">
          <fieldset className="employeeForm__fieldset">
            <legend>Address</legend>
            <FormInputMemo
              label="Street"
              onChange={handleStreetChange}
              inputValue={street}
            />
            <FormInputMemo
              label="City"
              onChange={handleCityChange}
              inputValue={city}
            />
            <FormSelectMemo
              label="State"
              options={STATES}
              onChange={handleStateChange}
              selectedOption={state}
              textField="name"
              valueField="abbreviation"
              backgroundColor="white"
              formType={formType}
            />
            <FormInputMemo
              type="number"
              label="Zip Code"
              onChange={handleZipCodeChange}
              inputValue={zipCode}
            />
          </fieldset>
        </div>
      </div>

      <button type="submit" className="employeeForm__submitButton">
        {formType === 'create' ? `Save` : `Update`}
      </button>
    </form>
  )
}

EmployeeForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
}
