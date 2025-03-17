import { useContext } from 'react'
import { deleteModalContext } from '../../../../contexts/deleteModalContext'
import { CustomModal } from '../../../CustomModal/CustomModal'
import PropTypes from 'prop-types'
import './_ConfirmDeleteModal.scss'

/**
 * Displays a modal to confirm delete row in Data Table
 *
 * @param {Function} deleteAction the function to call to delete a row
 *
 * @returns {React.ReactElement} A CustomModal to confirm delete
 */
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
          <span className="confirm-delete-modal__name">{itemToDeleteName}</span>
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

ConfirmDeleteModal.propTypes = {
  deleteAction: PropTypes.func.isRequired,
}
