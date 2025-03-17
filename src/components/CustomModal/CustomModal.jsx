import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import PropTypes from 'prop-types'
import './_CustomModal.scss'

/**
 * Displays a modal
 *
 * @param {boolean} open modal state
 * @param {function} onClose modal state setter on close mmodal
 * @param {React.ReactNode|HTMLElement} children modal content
 *
 * @returns {React.ReactElement} Modal base
 */
export function CustomModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} center>
      {children}
    </Modal>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
