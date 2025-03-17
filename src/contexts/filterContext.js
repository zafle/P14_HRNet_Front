import { createContext } from 'react'

/**
 * Creates context for CustomDataTable filter functionnality
 */
export const filterContext = createContext({
  filterText: '',
  resetPagination: false,

  defineFilterText: () => {},
  toggleResetPagination: () => {},
})
