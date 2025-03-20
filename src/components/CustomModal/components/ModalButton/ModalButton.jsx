import PropTypes from 'prop-types'
import './_ModalButton.scss'

/**
 * Displays a modal button
 *
 * @param {string} type 'confirm' | 'cancel'
 * @param {function} action action to execute onClick
 *
 * @returns {React.ReactElement} CustomModal button
 */
export default function ModalButton({ type, action }) {
  return (
    <button onClick={action} className={`modalButton modalButton--${type}`}>
      {type}
    </button>
  )
}

ModalButton.propTypes = {
  type: PropTypes.oneOf(['confirm', 'cancel']).isRequired,
  action: PropTypes.func.isRequired,
}
