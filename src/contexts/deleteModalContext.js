import { createContext } from 'react'

export const deleteModalContext = createContext({
  isConfirmDeleteModalOpen: false,
  itemToDeleteId: '',
  itemToDeleteName: '',
  toggleConfirmDeleteModal: () => {},
  defineItemToDeleteId: () => {},
  defineItemToDeleteName: () => {},
})
