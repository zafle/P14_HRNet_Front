import { CustomModal } from '../../../CustomModal/CustomModal'
import { deleteModalContext } from '../../../../contexts/deleteModalContext'
import { useContext } from 'react'

export default function ConfirmDeleteModal({ deleteAction }) {
  const {
    isConfirmDeleteModalOpen,
    itemToDeleteId,
    itemToDeleteName,
    toggleConfirmDeleteModal,
  } = useContext(deleteModalContext)

  const handleOnClickCancel = () => {
    deleteAction(itemToDeleteId)
    toggleConfirmDeleteModal()
  }

  return (
    <CustomModal
      open={isConfirmDeleteModalOpen}
      onClose={toggleConfirmDeleteModal}
    >
      <div className="confirm-delete-modal">
        <p>
          You&apos;re about to delete permanently:
          <br />
          {itemToDeleteName}
        </p>
        <p>Do you confirm suppression ?</p>
        <button
          className="confirm-delete-modal__button confirm-delete-modal__button--confirm"
          onClick={handleOnClickCancel}
        >
          Confirm
        </button>
        <button
          className="confirm-delete-modal__button confirm-delete-modal__button--cancel"
          onClick={toggleConfirmDeleteModal}
        >
          Cancel
        </button>
      </div>
    </CustomModal>
  )
}
