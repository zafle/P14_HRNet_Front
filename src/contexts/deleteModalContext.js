import { createContext } from 'react'

/**
 * Creates context for delete functionality
 * in CustomDataTable component
 * and ConfirmDeleteModal component
 */
export const deleteModalContext = createContext({
  isConfirmDeleteModalOpen: false,
  itemToDeleteId: '',
  itemToDeleteName: '',
  toggleConfirmDeleteModal: () => {},
  defineItemToDeleteId: () => {},
  defineItemToDeleteName: () => {},
})
