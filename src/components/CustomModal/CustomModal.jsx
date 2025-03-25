import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import PropTypes from 'prop-types'
import './_CustomModal.scss'

/**
 * Displays a custom 'react-responsive-modal'
 *
 * NOTE: 'isControl' prop === true means
 * modal won't close if user doesn't confirm his action
 *
 * @param {boolean} open modal state that indicates if modal is open
 * @param {function} onClose function to call on close modal
 * @param {boolean} isControl has modal a question to answer ?
 * @param {Object | undefined} shakingRef inside modal container ref to animate
 * @param {React.ReactNode|HTMLElement} children modal content
 *
 * @returns {React.ReactElement} Modal base
 */
export default function CustomModal({
  open,
  onClose,
  isControl = false,
  shakingRef,
  children,
}) {
  const handleCloseWithoutAnswer = () => {
    shakingRef?.current.classList.add('shakeModal')
    shakingRef?.current.classList.remove('confirmMessage')

    setTimeout(() => {
      shakingRef?.current.classList.remove('shakeModal')
      shakingRef?.current.classList.add('confirmMessage')
    }, 100)
  }

  return (
    <Modal
      open={open}
      onClose={isControl ? handleCloseWithoutAnswer : onClose}
      center
      closeOnEsc={!isControl}
      closeOnOverlayClick={!isControl}
      onEscKeyDown={isControl ? handleCloseWithoutAnswer : null}
      onOverlayClick={isControl ? handleCloseWithoutAnswer : null}
    >
      {children}
    </Modal>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  isControl: PropTypes.bool,
  shakingRef: PropTypes.object,
  children: PropTypes.node.isRequired,
}
