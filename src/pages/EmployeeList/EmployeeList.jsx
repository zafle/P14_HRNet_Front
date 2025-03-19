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
 * Displays employee-list page
 * - Displays CustomDataTable with all employees
 *
 * @returns {React.ReactElement} employee-list page
 */
export default function EmployeeList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Gets data table content
  const allEmployees = useSelector(getAllEmployees)

  // Creates the function to use on delete employee Data Table row
  const handleOnDeleteEmployee = (id) => {
    dispatch(employeesSlice.actions.removeEmployee(id))
  }

  // Creates the function to use on edit employee Data Table
  const handleOnEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`)
  }

  return (
    <main>
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
    </main>
  )
}
