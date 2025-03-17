import { SelectMenu } from '@zafle/select_menu'
import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import variables from '../../styles/_export.module.scss'
import './_FormSelect.scss'

/**
 * Displays a custom SelectMenu
 * - Used in Home page form Create Employee
 *
 * @param {string} label SelectMenu label
 * @param {Array.<string|Object>} options SelectMenu data for dropdown options
 * @param {function} onChange function to use when an option is selected
 * @param {string} selectedOption the selected option state
 * @param {string} textField the property name for options text in the options Array data
 * @param {string} valueField the property name for options values in the options Array data
 * @param {string} backgroundColor background color for SelectMenu input
 *
 * @returns {React.ReactElement} customized SelectMenu
 * }
 */
export const FormSelectMemo = memo(function FormSelect({
  label,
  options,
  onChange,
  selectedOption,
  textField,
  valueField,
  backgroundColor,
}) {
  // gets scss variables
  const {
    inputMarginTop,
    inputVerticalPadding,
    inputHorizontalPadding,
    inputMaxWidth,
    inputFontSize,
    formItemMarginBottom,
    primaryColor,
  } = variables

  // Creates a local state for the selected option
  // - Allows to enable default selected option from selectMenu
  // - (Otherwise reset form does not reset on the default value)
  const [componentSelected, setComponentSelected] = useState('')

  // // Updates local and redux state on change
  const handleChange = (option) => {
    setComponentSelected(option)
    onChange(option)
  }

  // On reset form, this will give the default selected value to the local state
  // (if not empty)
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
})

FormSelectMemo.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      // without values
      PropTypes.string,
      // with values
      PropTypes.shape({
        // textField
        [PropTypes.string]: PropTypes.string,
        // valueField
        [PropTypes.string]: PropTypes.string,
      }),
      // optgroups without values
      PropTypes.shape({
        // labelField
        [PropTypes.string]: PropTypes.string,
        // options array
        [PropTypes.string]: PropTypes.arrayOf(PropTypes.string),
      }),
      //optgroup with values
      PropTypes.shape({
        // labelField
        [PropTypes.string]: PropTypes.string,
        // options array
        [PropTypes.string]: PropTypes.arrayOf(
          PropTypes.shape({
            // textField
            [PropTypes.string]: PropTypes.string,
            // valueField
            [PropTypes.string]: PropTypes.string,
          })
        ),
      }),
    ])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textField: PropTypes.string,
  valueField: PropTypes.string,
}
