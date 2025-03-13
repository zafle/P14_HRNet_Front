import PropTypes from 'prop-types'
import './_FormInput.scss'
import { memo } from 'react'

export const FormInputMemo = memo(function FormInput({
  type = 'text',
  label,
  onChange,
  inputValue,
  background,
}) {
  console.log('FormInput has re-render from ', label)

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
// export default function FormInput({
//   type = 'text',
//   label,
//   onChange,
//   inputValue,
//   background,
// }) {
//   console.log('FormInput has re-render from ', label)

//   return (
//     <label className="formLabel">
//       {label}
//       <input
//         className={`formInput ${background ? 'formInput--colored' : ''}`}
//         type={type}
//         onChange={onChange}
//         value={inputValue}
//       />
//     </label>
//   )
// }

// FormInput.propTypes = {
//   type: PropTypes.string,
//   label: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   inputValue: PropTypes.string.isRequired,
//   background: PropTypes.bool,
// }
