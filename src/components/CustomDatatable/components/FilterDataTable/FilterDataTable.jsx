import { memo, useCallback, useContext } from 'react'
import { filterContext } from '../../../../contexts/filterContext'
import './_FilterDataTable.scss'

/**
 * Displays a filter input to search in Data table
 *
 * @returns {React.ReactElement} memoized FilterDataTable
 */
export const FilterDataTableMemo = memo(function FilterDataTable() {
  // get context
  const { filterText, toggleResetPagination, defineFilterText } =
    useContext(filterContext)

  const handleClear = useCallback(() => {
    if (filterText) {
      toggleResetPagination()
      defineFilterText('')
    }
  }, [filterText, defineFilterText, toggleResetPagination])

  const handleChange = useCallback(
    (e) => {
      defineFilterText(e.target.value)
    },
    [defineFilterText]
  )

  return (
    <div className="datatable-filter">
      <input
        className="datatable-filter__input"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={filterText}
        onChange={handleChange}
      />
      <button
        className="datatable-filter__button"
        type="button"
        onClick={handleClear}
      >
        X
      </button>
    </div>
  )
})
