import { SelectMenu } from '@zafle/select_menu'
import PropTypes from 'prop-types'
import './_FormSelect.scss'
import variables from '../../styles/sass/_export.module.scss'

export default function FormSelect({
  label,
  options,
  onChange,
  textField,
  valueField,
  backgroundColor,
}) {
  const {
    inputMarginTop,
    inputVerticalPadding,
    inputHorizontalPadding,
    inputMaxWidth,
    inputFontSize,
    formItemMarginBottom,
    primaryColor,
  } = variables
  console.log('inputMarginTop', inputMarginTop)
  return (
    <>
      <label htmlFor={`select-${label}`} className="selectFormLabel">
        {label}
      </label>
      <SelectMenu
        id={`select-${label}`}
        options={options}
        onChangeValue={onChange}
        textField={textField ? textField : ''}
        valueField={valueField ? valueField : ''}
        defaultSelectedOption="first"
        border="unset"
        containerMargin={`${inputMarginTop} 0 ${formItemMarginBottom} 0`}
        borderRadius="0"
        inputBackground={backgroundColor}
        boxShadow="10px 10px 15px rgba(0, 0, 0, 0.2)"
        inputVerticalPadding={inputVerticalPadding}
        inputHorizontalPadding={inputHorizontalPadding}
        maxWidth={inputMaxWidth}
        optionFontSize={inputFontSize}
        hoveredOptionBackground={primaryColor}
        boxShadowOnOpen={true}
        dropdownMaxHeight="250px"
      />
    </>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textField: PropTypes.string,
  valueField: PropTypes.string,
}
