import { memo } from 'react'
import PropTypes from 'prop-types'
import './_CustomButton.scss'

/**
 * Displays a customed button for EmployeeForm and modals
 *
 * @param {boolean} submit True if button is submit button, default = false
 * @param {string} buttonType True if button is submit button, default = false
 *
 */
export const CustomButtonMemo = memo(function CustomButton({
  submit = false,
  buttonType,
  buttonText,
  action,
}) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`customButton customButton--${buttonType}`}
      onClick={submit ? null : action}
    >
      {buttonText}
    </button>
  )
})

CustomButtonMemo.propTypes = {
  submit: PropTypes.bool,
  buttonType: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func,
}
