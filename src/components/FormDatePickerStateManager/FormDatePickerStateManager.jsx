import { memo, useEffect, useState } from 'react'
import { FormDatePickerMemo } from '../FormDatePicker/FormDatePicker'
import PropTypes from 'prop-types'

/**
 * Displays a memoized FormDatePickerStateManager
 * - creates a local state from redux state
 * and provides it to FormDatePickerMemo
 * to prevent its re-render when redux date state updates
 * (without it, DatePicker re-render when a date is selected,
 * and the calendar popup re-opens after closing.)
 *
 * @param {string} type input type (default = text)
 * @param {string} label input label
 * @param {string} onChange onChange input function
 * @param {string} inputValue input value
 * @param {string} background input background color
 *
 * @returns {React.ReactElement} FormInput Component
 */
export const FormDatePickerStateManagerMemo = memo(
  function FormDatePickerStateManager({ label, date, dispatchDate, maxDate }) {
    const [startDate, setStartDate] = useState(date)

    useEffect(() => {
      if (startDate !== date) {
        dispatchDate(startDate)
      }
    }, [startDate, date, dispatchDate])

    return (
      <FormDatePickerMemo
        label={label}
        date={startDate}
        setDate={setStartDate}
        maxDate={maxDate ? maxDate : null}
      />
    )
  }
)

FormDatePickerStateManagerMemo.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string,
  dispatchDate: PropTypes.func.isRequired,
  maxDate: PropTypes.object,
}
