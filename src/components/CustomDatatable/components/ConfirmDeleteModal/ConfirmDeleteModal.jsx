import { useContext } from 'react'
import { deleteModalContext } from '../../../../contexts/deleteModalContext'
import CustomModal from '../../../CustomModal/CustomModal'
import ModalButton from '../../../CustomModal/components/ModalButton/ModalButton'
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

  const handleOnClickConfirmDelete = () => {
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
        <ModalButton type="confirm" action={handleOnClickConfirmDelete} />
        <ModalButton type="cancel" action={toggleConfirmDeleteModal} />
      </div>
    </CustomModal>
  )
}

ConfirmDeleteModal.propTypes = {
  deleteAction: PropTypes.func.isRequired,
}
