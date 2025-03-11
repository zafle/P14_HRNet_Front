import { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterComponent from './components/FilterComponent/FilterComponent'
import PropTypes from 'prop-types'
import './_CustomDataTable.scss'
import variables from '../../styles/_export.module.scss'

// export default function CustomDataTable({ columns, data, properties, title }) {
export default function CustomDataTable({
  title,
  headerCellsTitles,
  filterProperties,
  tableData,
}) {
  // scss variables
  const { thirdColor, inputBackgroundColored } = variables
  // States for filtering data
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  const [sortedByColumn, setSortedByColumn] = useState(1)
  const handleSort = (column) => {
    setSortedByColumn(column.id)
  }

  useEffect(() => {
    function styleSortedByCells(cells) {
      cells.forEach((item) => {
        const itemId = parseInt(item.getAttribute('data-column-id'))
        item.style.background =
          itemId !== sortedByColumn ? '' : 'rgba(110, 110, 110, 0.1)'
      })
    }
    styleSortedByCells(document.querySelectorAll('.rdt_TableCol'))
    styleSortedByCells(document.querySelectorAll('.rdt_TableCell'))
  }, [sortedByColumn])

  // format data
  const createColumns = (columnsTitles) => {
    return Object.entries(columnsTitles).map(([key, value]) => ({
      name: value,
      selector: (row) => row[key],
      sortable: true,
    }))
  }

  const createData = (data) => {
    return data.map((item, index) => ({
      ...item,
      id: index + 1,
    }))
  }

  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottomColor: `${thirdColor}`,
        },
      },
      stripedStyle: {
        backgroundColor: `${inputBackgroundColored}`,
      },
    },
  }

  // creates data
  const columns = createColumns(headerCellsTitles)
  const data = createData(tableData)

  const filteredData = data.filter((item) =>
    filterProperties.some(
      (key) =>
        item[key] &&
        item[key].toString().toLowerCase().includes(filterText.toLowerCase())
    )
  )

  // creates filter component
  const filterDataTableMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  return (
    <div className="dataTable_container">
      <DataTable
        title={title}
        columns={columns}
        data={filteredData}
        onSort={handleSort}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={filterDataTableMemo}
        selectableRows
        persistTableHead
        dense
        striped
        customStyles={customStyles}
      />
    </div>
  )
}
CustomDataTable.propTypes = {
  title: PropTypes.string.isRequired,
  headerCellsTitles: PropTypes.object.isRequired,
  filterProperties: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
}
