import { useContext, useRef } from 'react'
import { deleteModalContext } from '../../../../contexts/deleteModalContext'
import CustomModal from '../../../CustomModal/CustomModal'
import { CustomButtonMemo } from '../../../CustomButton/CustomButton'
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
  const shakingModalRef = useRef(null)

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
      isControl={true}
      shakingRef={shakingModalRef}
    >
      <div ref={shakingModalRef} className="confirm-delete-modal">
        <p>
          You&apos;re about to delete permanently:
          <span className="confirm-delete-modal__name">{itemToDeleteName}</span>
        </p>
        <p>Do you confirm suppression ?</p>
        <CustomButtonMemo
          buttonType="primary"
          buttonText="confirm"
          action={handleOnClickConfirmDelete}
        />
        <CustomButtonMemo
          buttonType="secondary"
          buttonText="cancel"
          action={toggleConfirmDeleteModal}
        />
      </div>
    </CustomModal>
  )
}

ConfirmDeleteModal.propTypes = {
  deleteAction: PropTypes.func.isRequired,
}
