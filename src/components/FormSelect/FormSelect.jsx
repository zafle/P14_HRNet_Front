import PropTypes from 'prop-types'

export default function FormSelect({ label, options, onChange, selectValue, key }) {
  return (
    <label>
      {label}
      <select onChange={onChange} value={selectValue}>
        {options.map((option, index) => (
          <option key={`${index}-${key}`} value={option.value ? option.value : option.text}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
}
