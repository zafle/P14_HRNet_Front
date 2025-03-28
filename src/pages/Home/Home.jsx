import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// slices
import { employeeSlice } from '../../redux/features/employeeSlice'
import { employeesSlice } from '../../redux/features/employeesSlice'
import { formControlSlice } from '../../redux/features/formControlSlice'
// selectors
import { getNewEmployeeId } from '../../redux/selectors'
// components
import MainTitle from '../../components/MainTitle/MainTitle'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import CustomModal from '../../components/CustomModal/CustomModal'

/**
 * Displays Homepage
 * - Displays Employee form
 * - Displays a modal on submit
 *
 * @returns {React.ReactElement} Home page with Create Employee form
 */
export default function Home() {
  const dispatch = useDispatch()

  const newEmployeeId = useSelector(getNewEmployeeId)

  // ############### MODAL ###############
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // ############### HANDLE CREATE EMPLOYEE FORM ###############

  const clearForm = () => {
    dispatch(employeeSlice.actions.clearEmployee())
    dispatch(formControlSlice.actions.setClearDate(true))
  }

  const handleSubmitForm = (employee) => {
    dispatch(
      employeesSlice.actions.addEmployee({
        id: newEmployeeId,
        ...employee,
      })
    )
    clearForm()
    setIsModalOpen(true)
  }

  const handleResetForm = () => {
    clearForm()
  }

  return (
    <>
      <MainTitle title="Create Employee" />
      <EmployeeForm
        onSubmitForm={handleSubmitForm}
        onClearForm={handleResetForm}
        formType="create"
      />
      <CustomModal open={isModalOpen} onClose={handleCloseModal}>
        <p>Employee Created!</p>
      </CustomModal>
    </>
  )
}
