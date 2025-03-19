import { memo } from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a memoized input component
 * - Used in Home form Create Employee
 *
 * @param {string} type input type (default = text)
 * @param {string} label input label
 * @param {string} onChange onChange input function
 * @param {string} inputValue input value
 * @param {string} background input background color
 *
 * @returns {React.ReactElement} FormInput Component
 */
export const FormInputMemo = memo(function FormInput({
  type = 'text',
  label,
  onChange,
  inputValue,
  background,
}) {
  return (
    <label className="formLabel">
      {label}
      <input
        className={`formInput ${background ? 'formInput--colored' : ''}`}
        type={type}
        onChange={onChange}
        value={inputValue}
      />
    </label>
  )
})

FormInputMemo.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  background: PropTypes.bool,
}
