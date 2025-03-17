import { useState } from 'react'
import { deleteModalContext } from '../deleteModalContext'
import PropTypes from 'prop-types'

/**
 * Creates a context for delete item functionnality in CustomDataTable and ConfirmDeleteModal
 * @param {React.ReactNode} children
 *
 * @returns {JSX.Element} deleteModalContext Provider
 */
export default function DeleteModalContextProvider({ children }) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false)
  const [itemToDeleteId, setItemToDeleteId] = useState()
  const [itemToDeleteName, setItemToDeleteName] = useState('')

  const toggleConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(!isConfirmDeleteModalOpen)
  }

  const defineItemToDeleteId = (id) => {
    setItemToDeleteId(id)
  }

  const defineItemToDeleteName = (name) => {
    setItemToDeleteName(name)
  }

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

DeleteModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
