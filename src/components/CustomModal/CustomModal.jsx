import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import PropTypes from 'prop-types'
import './_CustomModal.scss'

export function CustomModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} center>
      {/* <p>{message}</p> */}
      {children}
    </Modal>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
