import { memo } from 'react'
import PropTypes from 'prop-types'
import './_FormButton.scss'

/**
 * Displays a customed button for EmployeeForm
 *
 * @param {boolean} submit True if button is submit button, default = false
 * @param {string} buttonType True if button is submit button, default = false
 *
 */
export const FormButtonMemo = memo(function FormButton({
  submit = false,
  buttonType,
  buttonText,
  action,
}) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`formButton formButton--${buttonType}`}
      onClick={submit ? null : action}
    >
      {buttonText}
    </button>
  )
})

FormButtonMemo.propTypes = {
  submit: PropTypes.bool,
  buttonType: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func,
}
