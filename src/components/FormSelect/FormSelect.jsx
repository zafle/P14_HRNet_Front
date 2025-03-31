import { SelectMenu } from '@zafle/select_menu'
import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import variables from '../../styles/_export.module.scss'
import './_FormSelect.scss'

/**
 * Displays a custom SelectMenu
 * - Used in EmployeeForm
 *
 * @param {string} label SelectMenu label
 * @param {Array.<string|Object>} options SelectMenu data for dropdown options
 * @param {function} onChange function to use when an option is selected
 * @param {string | null} selectedOption the selected option Redux state
 * @param {string} textField the property name for options text in the options Array data
 * @param {string} valueField the property name for options values in the options Array data
 * @param {string} backgroundColor background color for SelectMenu input
 * @param {string} formType 'create' | 'update'
 *
 * @returns {React.ReactElement} customized SelectMenu
 */
export const FormSelectMemo = memo(function FormSelect({
  label,
  options,
  onChange,
  selectedOption,
  textField,
  valueField,
  backgroundColor,
  formType,
}) {
  // get scss variables
  const {
    inputMarginTop,
    inputVerticalPadding,
    inputHorizontalPadding,
    inputMaxWidth,
    inputFontSize,
    formItemMarginBottom,
    primaryColor,
  } = variables

  // Create a local empty state for the selectedOption prop
  // -> this lets SelectMenu component display set default value
  // (this default value changes if formType is create or update)
  const [componentSelected, setComponentSelected] = useState('')

  // Handle onChangeValue prop
  // Update local and redux state on change
  const handleChange = (option) => {
    setComponentSelected(option)
    onChange(option)
  }

  // Reset local state when the form is reset
  useEffect(() => {
    if (selectedOption === null) {
      setComponentSelected(selectedOption)
    }
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
        resetToDefault={formType === 'create'}
        textField={textField ? textField : ''}
        valueField={valueField ? valueField : ''}
        defaultSelectedOption={
          formType === 'create'
            ? 'first'
            : selectedOption !== ''
            ? selectedOption
            : 'default'
        }
        //  ########### FOR PRESENTATION ###########
        // defaultSelectedOption={
        //   label === 'Department' ? 'Marketing' : 'Colorado'
        // }
        //  ########################################
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
  selectedOption: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  formType: PropTypes.oneOf(['create', 'update']).isRequired,
}
