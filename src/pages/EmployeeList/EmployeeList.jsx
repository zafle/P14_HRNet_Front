import { useDispatch, useSelector } from 'react-redux'
import {
  getAllEmployees,
  getEmployeeCellData,
  getEmployeeProperties,
} from '../../redux/selectors'
import { employeesSlice } from '../../redux/features/employeesSlice'
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable'
import FilterContextProvider from '../../contexts/FilterContextProvider/FilterContextProvider'
import DeleteModalContextProvider from '../../contexts/DeleteModalContextProvider/DeleteModalContextProvider'
import MainTitle from '../../components/MainTitle/MainTitle'

export default function EmployeeList() {
  const dispatch = useDispatch()

  // for data table content
  const employeeCellData = useSelector(getEmployeeCellData)
  const employeeProperties = useSelector(getEmployeeProperties)
  const allEmployees = useSelector(getAllEmployees)

  console.log('allEmployees', allEmployees)

  const handleOnDeleteEmployee = (id) => {
    dispatch(employeesSlice.actions.removeEmployee(id))
  }

  const onDeleteActionData = {
    nameProperty: 'firstName',
    action: handleOnDeleteEmployee,
  }
  console.log('employeeCellData', employeeCellData)
  return (
    <main>
      <MainTitle title="Current Employees" />
      <FilterContextProvider>
        <DeleteModalContextProvider>
          <CustomDataTable
            headerCellsData={employeeCellData}
            filterProperties={employeeProperties}
            tableData={allEmployees}
            onDeleteAction={onDeleteActionData}
            ariaLabel="Current employees data table"
          />
        </DeleteModalContextProvider>
      </FilterContextProvider>
    </main>
  )
}
