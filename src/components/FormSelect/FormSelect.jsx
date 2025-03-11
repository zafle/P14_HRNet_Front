import { SelectMenu } from '@zafle/select_menu'
import PropTypes from 'prop-types'
import './_FormSelect.scss'
import variables from '../../styles/_export.module.scss'
import { useEffect, useState } from 'react'

export default function FormSelect({
  label,
  options,
  onChange,
  selectedOption,
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

  const [componentSelected, setComponentSelected] = useState('')
  const handleChange = (option) => {
    setComponentSelected(option)
    onChange(option)
  }

  useEffect(() => {
    if (selectedOption !== componentSelected) {
      setComponentSelected(selectedOption)
    }
    // NOTE: Run effect only when selectedOption changes,
    // please recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption])

  return (
    <>
      <label htmlFor={`select-${label}`} className="selectFormLabel">
        {label}
      </label>
      <SelectMenu
        id={`select-${label}`}
        options={options}
        onChangeValue={handleChange}
        selectedOption={componentSelected}
        resetToDefault={true}
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
  selectedOption: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textField: PropTypes.string,
  valueField: PropTypes.string,
}
