import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// slices
import { employeeSlice } from '../../redux/features/employeeSlice'
import { employeesSlice } from '../../redux/features/employeesSlice'
import { formControlSlice } from '../../redux/features/formControlSlice'
// selectors
import {
  getCity,
  getDateOfBirth,
  getDepartment,
  getFirstName,
  getLastName,
  getNewEmployeeId,
  getStartDate,
  getState,
  getStreet,
  getZipCode,
} from '../../redux/selectors'
// data
import { DEPARTMENTS, STATES } from '../../data/employeeForm'
// components
import MainTitle from '../../components/MainTitle/MainTitle'
import { FormInputMemo } from '../../components/FormInput/FormInput'
import { FormSelectMemo } from '../../components/FormSelect/FormSelect'
import { FormDatePickerStateManagerMemo } from '../../components/FormDatePickerStateManager/FormDatePickerStateManager'
import { CustomModal } from '../../components/CustomModal/CustomModal'
// css
import variables from '../../styles/_export.module.scss'
import './_Home.scss'

/**
 * Displays Homepage
 * - Displays Employee form
 * - Displays a modal on submit
 *
 * @returns {React.ReactElement} Home page with Create Employee form
 */
export default function Home() {
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

  const newEmployeeId = useSelector(getNewEmployeeId)

  // ############### MODAL STATE ###############
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpenModal = () => {
    setIsModalOpen(true)
  }
  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  // ############### DATE PICKERS UTILS ###############
  const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat('en-GB').format(new Date(date))
    if (formatedDate === '01/01/1970') {
      return ''
    }
    return formatedDate
  }

  const today = useMemo(() => new Date(), [])

  // ############### HANDLE FORM ###############

  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(
      employeesSlice.actions.addEmployee({
        id: newEmployeeId,
        firstName,
        lastName,
        startDate: formatDate(startDate),
        department,
        dateOfBirth: formatDate(dateOfBirth),
        street,
        city,
        state,
        zipCode,
      })
    )
    dispatch(employeeSlice.actions.clearEmployee())
    dispatch(formControlSlice.actions.setClearDate(true))
    onOpenModal()
  }

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
    <main>
      <CustomModal open={isModalOpen} onClose={onCloseModal}>
        <p>Employee Created!</p>
      </CustomModal>
      <MainTitle title="Create Employee" />
      <form className="createEmployeeForm" onSubmit={handleSubmitForm}>
        <div className="createEmployeeForm__insideContainer">
          <div className="createEmployeeForm__block">
            <div className="createEmployeeForm__block--insideContainer">
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
              />
            </div>
          </div>
          <div className="createEmployeeForm__block">
            <fieldset className="createEmployeeForm__fieldset">
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

        <button type="submit" className="createEmployeeForm__submitButton">
          Save
        </button>
      </form>
    </main>
  )
}
