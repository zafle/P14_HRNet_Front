import { createContext } from 'react'

export const filterContext = createContext({
  filterText: '',
  resetPagination: false,

  defineFilterText: () => {},
  toggleResetPagination: () => {},
})
