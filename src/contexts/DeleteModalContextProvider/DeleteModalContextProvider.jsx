import { useCallback, useState } from 'react'
import { deleteModalContext } from '../deleteModalContext'

export default function DeleteModalContextProvider({ children }) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false)
  const [itemToDeleteId, setItemToDeleteId] = useState()
  const [itemToDeleteName, setItemToDeleteName] = useState('')

  const toggleConfirmDeleteModal = useCallback(() => {
    setIsConfirmDeleteModalOpen(!isConfirmDeleteModalOpen)
  }, [isConfirmDeleteModalOpen])

  const defineItemToDeleteId = useCallback((id) => {
    setItemToDeleteId(id)
  }, [])

  const defineItemToDeleteName = useCallback((name) => {
    setItemToDeleteName(name)
  }, [])

  return (
    <deleteModalContext.Provider
      value={{
        isConfirmDeleteModalOpen,
        itemToDeleteId,
        itemToDeleteName,
        toggleConfirmDeleteModal,
        defineItemToDeleteId,
        defineItemToDeleteName,
      }}
    >
      {children}
    </deleteModalContext.Provider>
  )
}
