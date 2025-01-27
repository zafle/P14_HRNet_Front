import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../../components/FormInput/FormInput'
import MainTitle from '../../components/MainTitle/MainTitle'
import { employeeSlice } from '../../redux/features/employeeSlice'
import { getEmployee } from '../../redux/selectors'
import FormSelect from '../../components/FormSelect/FormSelect'

export default function Home() {
  const dispatch = useDispatch()
  const {
    firstName,
    lastName,
    startDate,
    dateOfBirth,
    street,
    city,
    state,
    zipCode,
    department,
  } = useSelector(getEmployee)

  return (
    <main>
      <MainTitle title="Create Employee" />
      <form>
        <FormInput
          label="First Name"
          onChange={(e) => {
            dispatch(employeeSlice.actions.setFirstName(e.target.value))
          }}
          inputValue={firstName}
        />
        <FormInput
          label="Last Name"
          onChange={(e) => {
            dispatch(employeeSlice.actions.setLastName(e.target.value))
          }}
          inputValue={lastName}
        />
        <FormInput
          label="Date of Birth"
          onChange={(e) => {
            dispatch(employeeSlice.actions.setDateOfBirth(e.target.value))
          }}
          inputValue={dateOfBirth}
        />
        <FormInput
          label="Start Date"
          onChange={(e) => {
            dispatch(employeeSlice.actions.setStartDate(e.target.value))
          }}
          inputValue={startDate}
        />
        <fieldset>
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
          {/* <FormSelect
            label="State"
            options={ }
            onChange={(e) => {
              dispatch(employeeSlice.actions.setState(e.target.value))
            }}
            selectValue={state}
            key="state"/> */}
          <FormInput
            label="State"
            onChange={(e) => {
              dispatch(employeeSlice.actions.setState(e.target.value))
            }}
            inputValue={state}
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

        <label>
          Department
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </label>
      </form>
    </main>
  )
}
