import { useCallback, useEffect, useState } from 'react'
import { useBlocker, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
// Slices
import { employeeSlice } from '../../redux/features/employeeSlice'
import { employeesSlice } from '../../redux/features/employeesSlice'
import { formControlSlice } from '../../redux/features/formControlSlice'
// Selectors
import { getCreatedEmployeeById } from '../../redux/selectors'
// Components
import MainTitle from '../../components/MainTitle/MainTitle'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import CustomModal from '../../components/CustomModal/CustomModal'
import ModalButton from '../../components/CustomModal/components/ModalButton/ModalButton'
// Data
import { STATES } from '../../data/employeeForm'
// Util
import { omit } from 'lodash'

export default function EditEmployee() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSetEditedEmployee, setIsSetEditedEmployee] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isConfirmUpdatedModalOpen, setIsConfirmUpdatedModalOpen] =
    useState(false)

  // ############### UTIL TO CLEAR FORM ###############

  const clearForm = useCallback(() => {
    dispatch(employeeSlice.actions.clearEmployee())
    dispatch(formControlSlice.actions.setClearDate(true))
  }, [dispatch])

  // ############### GET EMPLOYEE TO UPDATE ###############
  const { employeeId } = useParams()
  const employee = useSelector((state) =>
    getCreatedEmployeeById(state, employeeId)
  )

  // ############### SET THE FORM ###############

  const formatDate = (dateToFormat) => {
    const formatedDate =
      dateToFormat !== null && dateToFormat !== ''
        ? new Date(dateToFormat).toString()
        : null
    return formatedDate
  }

  const getStateOptionText = (value) => {
    const selectedState = STATES.filter((state) => state.abbreviation === value)
    return selectedState.length ? selectedState[0].name : 'EMPTY_OPTION'
  }

  // If employee exists, fill the form with his data,
  // else redirect to 404
  useEffect(() => {
    if (!isSetEditedEmployee) {
      if (employee !== undefined) {
        dispatch(
          employeeSlice.actions.editEmployee({
            ...omit(employee, ['id']),
            dateOfBirth: formatDate(employee.dateOfBirth),
            startDate: formatDate(employee.startDate),
            state: getStateOptionText(employee.state),
            department:
              employee.department !== '' ? employee.department : 'EMPTY_OPTION',
          })
        )
        setIsSetEditedEmployee(true)
      } else if (employee === undefined) {
        navigate('/Error404')
      }
    }
  }, [isSetEditedEmployee, employee, dispatch, navigate])

  // ############### BLOCKING NAVIGATION ###############

  // If update has not been done OR saved
  // Block navigation by opening a confirm exit CustomModal

  const shouldBlock = ({ currentLocation, nextLocation }) =>
    !isUpdated && currentLocation.pathname !== nextLocation.pathname

  const blocker = useBlocker(shouldBlock)

  const handleOnConfirmExitPage = () => {
    clearForm()
    blocker.proceed()
  }
  const handleOnCancelExitPage = () => {
    blocker.reset()
  }

  // ############### HANDLE UPDATE FORM ###############

  const handleSubmitForm = (updatedEmployee) => {
    dispatch(
      employeesSlice.actions.updateEmployee({
        id: employeeId,
        changes: updatedEmployee,
      })
    )
    setIsUpdated(true)
  }

  useEffect(() => {
    if (isUpdated) {
      clearForm()
      setIsConfirmUpdatedModalOpen(true)
    }
  }, [isUpdated, clearForm])

  // ############### HANDLE UPDATED CONFIRM MODAL ###############

  const handleOnCloseConfirmUpdatedModal = () => {
    setIsConfirmUpdatedModalOpen(false)
    navigate('/employee-list')
  }

  return (
    <>
      <MainTitle title="Edit employee" />
      {isSetEditedEmployee && (
        <EmployeeForm onSubmitForm={handleSubmitForm} buttonText="Update" />
      )}
      <CustomModal
        open={isConfirmUpdatedModalOpen}
        onClose={handleOnCloseConfirmUpdatedModal}
      >
        <p>Employee updated!</p>
      </CustomModal>
      <CustomModal
        open={blocker.state === 'blocked'}
        onClose={handleOnCancelExitPage}
      >
        <p>Are you sure you want to leave this page?</p>
        <p>Changes you made will not be saved.</p>
        <ModalButton type="confirm" action={handleOnConfirmExitPage} />
        <ModalButton type="cancel" action={handleOnCancelExitPage} />
      </CustomModal>
    </>
  )
}
