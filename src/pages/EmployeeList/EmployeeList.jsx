import { useDispatch, useSelector } from 'react-redux'
// Contexts
import FilterContextProvider from '../../contexts/FilterContextProvider/FilterContextProvider'
import DeleteModalContextProvider from '../../contexts/DeleteModalContextProvider/DeleteModalContextProvider'
// Slice
import { employeesSlice } from '../../redux/features/employeesSlice'
// Selectors
import { getAllEmployees } from '../../redux/selectors'
// Data
import { employeesDataTableProperties } from '../../data/employeesDataTable'
// Components
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable'
import MainTitle from '../../components/MainTitle/MainTitle'

/**
 * Displays employee-list page
 * - Displays CustomDataTable with all employees
 *
 * @returns {React.ReactElement} employee-list page
 */
export default function EmployeeList() {
  const dispatch = useDispatch()

  // Gets data table content
  const allEmployees = useSelector(getAllEmployees)

  // Creates the function to use on delete employee Data Table row
  const handleOnDeleteEmployee = (id) => {
    dispatch(employeesSlice.actions.removeEmployee(id))
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
            ariaLabel="Current employees data table"
          />
        </DeleteModalContextProvider>
      </FilterContextProvider>
    </main>
  )
}
