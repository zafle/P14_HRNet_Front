import { useContext } from 'react'
import { filterContext } from '../../../../contexts/filterContext'
import FilterComponent from '../FilterComponent/FilterComponent'

export default function FilterDataTable() {
  const { filterText, toggleResetPagination, defineFilterText } =
    useContext(filterContext)

  const handleClear = () => {
    if (filterText) {
      toggleResetPagination()
      defineFilterText('')
    }
  }

  return (
    <FilterComponent
      onFilter={(e) => defineFilterText(e.target.value)}
      onClear={handleClear}
      filterText={filterText}
    />
  )
}
