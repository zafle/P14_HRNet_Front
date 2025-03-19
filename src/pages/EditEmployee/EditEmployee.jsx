import { useNavigate, useParams } from 'react-router'
import { getCreatedEmployeeById } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { employeeSlice } from '../../redux/features/employeeSlice'
import { useEffect, useState } from 'react'
import { CustomModal } from '../../components/CustomModal/CustomModal'
import MainTitle from '../../components/MainTitle/MainTitle'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import { formControlSlice } from '../../redux/features/formControlSlice'
import { employeesSlice } from '../../redux/features/employeesSlice'
import { STATES } from '../../data/employeeForm'
import { omit } from 'lodash'

export default function EditEmployee() {
  const { employeeId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSetEditedEmployee, setIsSetEditedEmployee] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  // ############### MODAL STATE ###############
  const [isModalOpen, setIsModalOpen] = useState(false)

  // const onOpenModal = () => {
  //   setIsModalOpen(true)
  // }
  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  // ############### BLOCKING NAVIGATION ###############

  // ############### BLOCKING NAVIGATION ###############

  const employee = useSelector((state) =>
    getCreatedEmployeeById(state, employeeId)
  )

  const formatDate = (dateToFormat) => {
    const formatedDate =
      dateToFormat !== null && dateToFormat !== ''
        ? new Date(dateToFormat).toString()
        : null
    return formatedDate
  }

  const getStateOptionText = (value) => {
    const selectedState = STATES.filter((state) => state.abbreviation === value)
    return selectedState.length ? selectedState[0].name : ''
  }

  useEffect(() => {
    if (!isSetEditedEmployee) {
      dispatch(
        employeeSlice.actions.editEmployee({
          ...omit(employee, ['id']),
          dateOfBirth: formatDate(employee.dateOfBirth),
          startDate: formatDate(employee.startDate),
          state: getStateOptionText(employee.state),
        })
      )

      setIsSetEditedEmployee(true)
    }
  }, [isSetEditedEmployee, employee, dispatch])

  useEffect(() => {
    if (isUpdated) {
      dispatch(employeeSlice.actions.clearEmployee())
      dispatch(formControlSlice.actions.setClearDate(true))
      navigate('/employee-list')
    }
  }, [isUpdated, dispatch, navigate])

  const handleSubmitForm = (updatedEmployee) => {
    dispatch(
      employeesSlice.actions.updateEmployee({
        id: employeeId,
        changes: updatedEmployee,
      })
    )
    setIsUpdated(true)
  }

  const handleOnCloseModal = () => {
    onCloseModal()
    navigate('/employee-list')
  }

  return (
    <main>
      <MainTitle title="Edit employee" />
      {isSetEditedEmployee && (
        <EmployeeForm onSubmitForm={handleSubmitForm} buttonText="Update" />
      )}
      <CustomModal open={isModalOpen} onClose={handleOnCloseModal}>
        <p>Employee updated!</p>
      </CustomModal>
      {/* <CustomModal open={isConfirmExitModalOpen} onClose={handleCancelExit}>
        <p>
          Do you really want to exit update without saving all your changes ?
        </p>
        <button onClick={handleConfirmExit}>Yes</button>
        <button onClick={handleCancelExit}>Cancel</button>
      </CustomModal> */}
    </main>
  )
}
