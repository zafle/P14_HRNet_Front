import { useDispatch, useSelector } from 'react-redux'
// Contexts
import FilterContextProvider from '../../contexts/FilterContextProvider/FilterContextProvider'
import DeleteModalContextProvider from '../../contexts/DeleteModalContextProvider/DeleteModalContextProvider'
// Slices
import { employeesSlice } from '../../redux/features/employeesSlice'
// Selectors
import { getAllEmployees } from '../../redux/selectors'
// Data
import { employeesDataTableProperties } from '../../data/employeesDataTable'
// Components
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable'
import MainTitle from '../../components/MainTitle/MainTitle'
import { useNavigate } from 'react-router'

/**
 * Displays employee-list page content
 * - Displays CustomDataTable with all employees
 *
 * @returns {React.ReactElement} employee-list page content
 */
export default function EmployeeList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get data table content
  const allEmployees = useSelector(getAllEmployees)

  // Create the function to use on delete employee Data Table row
  const handleOnDeleteEmployee = (id) => {
    dispatch(employeesSlice.actions.removeEmployee(id))
  }

  // Create the function to use on edit employee Data Table
  const handleOnEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`)
  }

  return (
    <>
      <MainTitle title="Current Employees" />
      <FilterContextProvider>
        <DeleteModalContextProvider>
          <CustomDataTable
            headerCellsData={employeesDataTableProperties}
            tableData={allEmployees}
            onDelete={handleOnDeleteEmployee}
            nameProperty="firstName"
            onEdit={handleOnEditEmployee}
            ariaLabel="Current employees data table"
          />
        </DeleteModalContextProvider>
      </FilterContextProvider>
    </>
  )
}
