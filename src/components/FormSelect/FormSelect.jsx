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
 * @param {string} selectedOption the selected option state
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

  // Create a local state for the selected option
  // - Allows to enable default selected option from selectMenu
  // - (Otherwise reset form does not reset on the default value)
  const [componentSelected, setComponentSelected] = useState('')

  const [defaultSelected, setDefaultSelected] = useState('')
  const [resetToDefault, setResetToDefault] = useState()

  useEffect(() => {
    if (formType === 'create') {
      setDefaultSelected('first')
      setResetToDefault(true)
    } else if (formType === 'update') {
      setResetToDefault(false)
      if (selectedOption === '') {
        setDefaultSelected('default')
      } else {
        setDefaultSelected(selectedOption)
      }
    }
    // NOTE: Run effect only when component mounts,
    // please recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle onChangeValue prop
  // Update local and redux state on change
  const handleChange = (option) => {
    setComponentSelected(option)
    onChange(option)
  }

  // Reset local state when reset form by injecting empty value programmatically
  useEffect(() => {
    if (selectedOption === '' && componentSelected !== '') {
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
      {defaultSelected !== '' && resetToDefault !== undefined && (
        <SelectMenu
          id={`select-${label}`}
          options={options}
          onChangeValue={handleChange}
          selectedOption={componentSelected}
          resetToDefault={resetToDefault}
          textField={textField ? textField : ''}
          valueField={valueField ? valueField : ''}
          defaultSelectedOption={defaultSelected}
          // defaultSelectedOption={
          //   label === 'Department' ? 'Marketing' : 'Colorado'
          // }
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
      )}
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
  formType: PropTypes.oneOf(['create', 'update']).isRequired,
}
