import PropTypes from 'prop-types'
import './_FormInput.scss'

export default function FormInput({
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
}

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  background: PropTypes.bool,
}
