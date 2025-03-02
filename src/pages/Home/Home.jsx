import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../../components/FormInput/FormInput'
import MainTitle from '../../components/MainTitle/MainTitle'
import { employeeSlice } from '../../redux/features/employeeSlice'
import { getEmployee } from '../../redux/selectors'
import { DEPARTMENTS, STATES } from '../../data/employeeForm'
import FormSelect from '../../components/FormSelect/FormSelect'
import variables from '../../styles/sass/_export.module.scss'
import './_Home.scss'

export default function Home() {
  const dispatch = useDispatch()
  const { firstName, lastName, startDate, dateOfBirth, street, city, zipCode } =
    useSelector(getEmployee)

  const { inputBackgroundColored } = variables

  return (
    <main>
      <MainTitle title="Create Employee" />
      <form className="createEmployeeForm">
        <div className="createEmployeeForm__insideContainer">
          <div className="createEmployeeForm__block">
            <div className="createEmployeeForm__block--insideContainer">
              <FormInput
                label="First Name"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setFirstName(e.target.value))
                }}
                inputValue={firstName}
                background={true}
              />
              <FormInput
                label="Last Name"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setLastName(e.target.value))
                }}
                inputValue={lastName}
                background={true}
              />
              <FormInput
                label="Date of Birth"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setDateOfBirth(e.target.value))
                }}
                inputValue={dateOfBirth}
                background={true}
              />
              <FormInput
                label="Start Date"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setStartDate(e.target.value))
                }}
                inputValue={startDate}
              />
              <FormSelect
                label="Department"
                options={DEPARTMENTS}
                onChange={(option) =>
                  dispatch(employeeSlice.actions.setDepartment(option))
                }
                backgroundColor={inputBackgroundColored}
              />
            </div>
          </div>
          <div className="createEmployeeForm__block">
            <fieldset className="createEmployeeForm__fieldset">
              <legend>Address</legend>
              <FormInput
                label="Street"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setStreet(e.target.value))
                }}
                inputValue={street}
              />
              <FormInput
                label="City"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setCity(e.target.value))
                }}
                inputValue={city}
              />
              <FormSelect
                label="State"
                options={STATES}
                onChange={(option) =>
                  dispatch(employeeSlice.actions.setState(option))
                }
                textField="name"
                valueField="abbreviation"
                backgroundColor="white"
              />
              <FormInput
                type="number"
                label="Zip Code"
                onChange={(e) => {
                  dispatch(employeeSlice.actions.setZipCode(e.target.value))
                }}
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
