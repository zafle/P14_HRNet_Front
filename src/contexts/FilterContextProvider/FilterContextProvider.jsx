import { useState } from 'react'
import { filterContext } from '../filterContext'
import PropTypes from 'prop-types'

/**
 * Creates a context for filter functionality in CustomDataTable component
 *
 * @param {React.ReactNode} children
 *
 * @returns {JSX.Element} filterContext Provider
 */
export default function FilterContextProvider({ children }) {
  const [filterText, setFilterText] = useState('')
  const [resetPagination, setResetPagination] = useState(false)

  const defineFilterText = (text) => {
    setFilterText(text)
  }

  const toggleResetPagination = () => {
    setResetPagination(!resetPagination)
  }

  return (
    <filterContext.Provider
      value={{
        filterText,
        resetPagination,
        defineFilterText,
        toggleResetPagination,
      }}
    >
      {children}
    </filterContext.Provider>
  )
}

FilterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
