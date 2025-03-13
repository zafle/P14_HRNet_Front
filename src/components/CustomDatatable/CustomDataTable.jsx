import { useContext, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'
import './_CustomDataTable.scss'
import variables from '../../styles/_export.module.scss'
import ConfirmDeleteModal from './components/ConfirmDeleteModal/ConfirmDeleteModal'
import FilterDataTable from './components/FilterDataTable/FilterDataTable'
import { filterContext } from '../../contexts/filterContext'
import DeleteButton from './components/DeleteButton/DeleteButton'

export default function CustomDataTable({
  headerCellsData,
  filterProperties,
  tableData,
  onDeleteAction,
  ariaLabel,
}) {
  const { filterText, toggleResetPagination } = useContext(filterContext)
  const [sortedByColumn, setSortedByColumn] = useState(1)
  const { thirdColor, lightThirdColor } = variables

  // Functions for sort functionality
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

  // creates table columns data
  const deleteColumn = [
    {
      cell: (row) => (
        <DeleteButton row={row} nameProperty={onDeleteAction.nameProperty} />
      ),
      maxWidth: '40px',
      minWidth: '40px',
    },
  ]

  const titlesColumns = Object.entries(headerCellsData).map(([key, value]) => ({
    name: value.title,
    selector: (row) => row[key],
    sortable: true,
    minWidth: '40px',
    maxWidth: value.width,
    wrap: true,
  }))
  console.log('columns', titlesColumns)

  const allColumns = deleteColumn.concat(titlesColumns)

  const filteredData = tableData.filter((item) =>
    filterProperties.some(
      (key) =>
        item[key] &&
        item[key].toString().toLowerCase().includes(filterText.toLowerCase())
    )
  )

  // creates custom styles
  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontWeight: '700',
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
        backgroundColor: `${lightThirdColor}`,
      },
    },
  }

  // creates filter component
  const filterDataTableMemo = useMemo(() => {
    return (
      <FilterDataTable
        filterText={filterText}
        toggleResetPagination={toggleResetPagination}
      />
    )
  }, [filterText, toggleResetPagination])

  return (
    <>
      <div className="dataTable_container">
        <DataTable
          columns={allColumns}
          data={filteredData}
          onSort={handleSort}
          pagination
          paginationResetDefaultPage={toggleResetPagination}
          subHeader
          subHeaderComponent={filterDataTableMemo}
          persistTableHead
          dense
          striped
          customStyles={customStyles}
          ariaLabel={ariaLabel}
        />
      </div>
      <ConfirmDeleteModal deleteAction={onDeleteAction.action} />
    </>
  )
}
CustomDataTable.propTypes = {
  headerCellsData: PropTypes.object.isRequired,
  filterProperties: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  onDeleteAction: PropTypes.object.isRequired,
}
