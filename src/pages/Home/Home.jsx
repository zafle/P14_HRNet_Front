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
import { CustomModal } from '../../components/CustomModal/CustomModal'
// import './_Home.scss'

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

  // ############### MODAL STATE ###############
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpenModal = () => {
    setIsModalOpen(true)
  }
  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  // ############### HANDLE SUBMIT EMPLOYEEFORM ###############

  const handleSubmitForm = (employee) => {
    dispatch(
      employeesSlice.actions.addEmployee({
        id: newEmployeeId,
        ...employee,
      })
    )
    dispatch(employeeSlice.actions.clearEmployee())
    dispatch(formControlSlice.actions.setClearDate(true))
    onOpenModal()
  }

  return (
    <main>
      <CustomModal open={isModalOpen} onClose={onCloseModal}>
        <p>Employee Created!</p>
      </CustomModal>
      <MainTitle title="Create Employee" />
      <EmployeeForm onSubmitForm={handleSubmitForm} buttonText="Save" />
    </main>
  )
}
