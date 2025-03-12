import { useCallback, useState } from 'react'
import { filterContext } from '../filterContext'

export default function FilterContextProvider({ children }) {
  const [filterText, setFilterText] = useState('')
  const [resetPagination, setResetPagination] = useState(false)

  const defineFilterText = useCallback((text) => {
    setFilterText(text)
  }, [])

  const toggleResetPagination = useCallback(() => {
    setResetPagination(!resetPagination)
  }, [resetPagination])

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
