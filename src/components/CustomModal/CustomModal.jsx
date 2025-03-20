import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import PropTypes from 'prop-types'
import './_CustomModal.scss'

/**
 * Displays a custom 'react-responsive-modal'
 *
 * @param {boolean} open modal state that indicates if modal is open
 * @param {function} onClose function to call on close modal
 * @param {React.ReactNode|HTMLElement} children modal content
 *
 * @returns {React.ReactElement} Modal base
 */
export default function CustomModal({ open, onClose, children }) {
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
