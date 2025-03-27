import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import DataTable from 'react-data-table-component'
import { filterContext } from '../../contexts/filterContext'
import ConfirmDeleteModal from './components/ConfirmDeleteModal/ConfirmDeleteModal'
import { FilterDataTableMemo } from './components/FilterDataTable/FilterDataTable'
import EditButton from './components/EditButton/EditButton'
import DeleteButton from './components/DeleteButton/DeleteButton'
import PropTypes from 'prop-types'
import variables from '../../styles/_export.module.scss'
import './_CustomDataTable.scss'

/**
 * Displays a memoized custom Data Table
 * - displays ConfirmDeleteModal on click delete icon
 *
 * @param {Object} headerCellsData Data for Columns
 * @param {Object} headerCellsData[key] Column property
 * @param {string} headerCellsData[key].title Column title
 * @param {string} headerCellsData[key].width Column fix width (not required)
 *
 * @param {Array.<id: number, property: string>} tableData Array of objects entities to display in the Data Table
 * @param {Function} onDelete function that will be executed on confirm delete in the modal
 * @param {string} nameProperty property from which the value will be returned in the ConfirmDeleteModal
 * @param {string} ariaLabel aria label for the Data Table
 *
 * @returns {React.ReactElement} CustomDataTable
 */
export const CustomDataTableMemo = memo(function CustomDataTable({
  headerCellsData,
  tableData,
  onDelete,
  nameProperty,
  onEdit,
  ariaLabel,
}) {
  // scss variables
  const { thirdColor, lightThirdColor } = variables

  // get context for filtering
  const { filterText, toggleResetPagination } = useContext(filterContext)

  // create state for sorting
  const [sortedByColumn, setSortedByColumn] = useState(3)

  // Functions for sort functionality
  const handleSort = useCallback(
    (column) => {
      if (column.id !== sortedByColumn) {
        setSortedByColumn(column.id)
      }
    },
    [sortedByColumn]
  )

  const sortDate = (key) => (rowA, rowB) => {
    const a = new Date(rowA[key])
    const b = new Date(rowB[key])

    if (a > b) {
      return 1
    }
    if (b > a) {
      return -1
    }
    return 0
  }

  // when the id of the sorted by columns changes
  // retrieves all the cells whith this id
  // and gives them a grey background
  const styleSortedByCells = useCallback(
    (cells) => {
      cells.forEach((item) => {
        const itemId = parseInt(item.getAttribute('data-column-id'))
        item.style.background =
          itemId !== sortedByColumn ? '' : 'rgba(110, 110, 110, 0.1)'
      })
    },
    [sortedByColumn]
  )

  useEffect(() => {
    if (sortedByColumn > 3) {
      styleSortedByCells(document.querySelectorAll('.rdt_TableCol'))
      styleSortedByCells(document.querySelectorAll('.rdt_TableCell'))
    }
  }, [sortedByColumn, styleSortedByCells])

  // creates table columns data
  const actionsColumn = useMemo(
    () => [
      {
        cell: (row) => <DeleteButton row={row} nameProperty={nameProperty} />,
        width: '40px',
      },
      {
        cell: (row) => <EditButton row={row} editAction={onEdit} />,
        width: '40px',
      },
    ],
    [nameProperty, onEdit]
  )

  const titlesColumns = useMemo(
    () =>
      Object.entries(headerCellsData).map(([key, value]) => ({
        name: value.title,
        selector: (row) => row[key],
        sortable: true,
        width: value.width !== '' ? value.width : null,
        wrap: true,
        sortFunction: value.format ? sortDate(key) : null,
        omit: key === 'id' ? true : false,
      })),
    [headerCellsData]
  )

  // const allColumns = actionsColumn.concat(titlesColumns)
  const allColumns = useMemo(
    () => actionsColumn.concat(titlesColumns),
    [actionsColumn, titlesColumns]
  )

  const filteredData = useMemo(
    () =>
      tableData.filter((item) =>
        Object.keys(headerCellsData).some(
          (key) =>
            item[key] &&
            item[key]
              .toString()
              .toLowerCase()
              .includes(filterText.toLowerCase())
        )
      ),
    [tableData, headerCellsData, filterText]
  )

  // creates custom styles
  const customStyles = useMemo(
    () => ({
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
    }),
    [thirdColor, lightThirdColor]
  )

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
          subHeaderComponent={<FilterDataTableMemo />}
          persistTableHead
          dense
          striped
          customStyles={customStyles}
          ariaLabel={ariaLabel}
          defaultSortAsc={false}
          defaultSortFieldId={3}
        />
      </div>
      <ConfirmDeleteModal deleteAction={onDelete} />
    </>
  )
})

CustomDataTableMemo.propTypes = {
  headerCellsData: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  nameProperty: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
}
