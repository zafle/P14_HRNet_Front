import { useDispatch, useSelector } from 'react-redux'
import {
  getAllEmployees,
  getEmployeeProperties,
  getEmployeeTitles,
} from '../../redux/selectors'
import { employeesSlice } from '../../redux/features/employeesSlice'
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable'
import FilterContextProvider from '../../contexts/FilterContextProvider/FilterContextProvider'
import DeleteModalContextProvider from '../../contexts/DeleteModalContextProvider/DeleteModalContextProvider'

export default function EmployeeList() {
  const dispatch = useDispatch()

  // for data table content
  const employeeTitles = useSelector(getEmployeeTitles)
  const employeeProperties = useSelector(getEmployeeProperties)
  const allEmployees = useSelector(getAllEmployees)

  const handleOnDeleteEmployee = (id) => {
    dispatch(employeesSlice.actions.removeEmployee(id))
  }

  const onDeleteActionData = {
    nameProperty: 'firstName',
    action: handleOnDeleteEmployee,
  }

  return (
    <>
      <FilterContextProvider>
        <DeleteModalContextProvider>
          <CustomDataTable
            title="Current Employees"
            headerCellsTitles={employeeTitles}
            filterProperties={employeeProperties}
            tableData={allEmployees}
            onDeleteAction={onDeleteActionData}
          />
        </DeleteModalContextProvider>
      </FilterContextProvider>
    </>
  )
}
