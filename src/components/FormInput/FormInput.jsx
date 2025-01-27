import PropTypes from 'prop-types'

export default function FormInput({
  type = 'text',
  label,
  onChange,
  inputValue,
}) {
  return (
    <label>
      {label}
      <input type={type} onChange={onChange} value={inputValue} />
    </label>
  )
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
}
