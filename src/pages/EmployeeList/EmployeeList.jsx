// import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { employeesSelector } from '../../redux/features/employeesSlice'
import { getEmployeeProperties, getEmployeeTitles } from '../../redux/selectors'
import CustomDataTable from '../../components/CustomDatatable/CustomDataTable'

export default function EmployeeList() {
  // for data table content
  const employeeTitles = useSelector(getEmployeeTitles)
  const employeeProperties = useSelector(getEmployeeProperties)
  const allEmployees = useSelector(employeesSelector.selectAll)

  return (
    <CustomDataTable
      title="Current Employees"
      headerCellsTitles={employeeTitles}
      filterProperties={employeeProperties}
      tableData={allEmployees}
    />
  )
}
