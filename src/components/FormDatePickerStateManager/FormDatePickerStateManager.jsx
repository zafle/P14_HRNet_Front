import { memo, useEffect, useState } from 'react'
import { FormDatePickerMemo } from '../FormDatePicker/FormDatePicker'
import PropTypes from 'prop-types'

export const FormDatePickerStateManagerMemo = memo(
  function FormDatePickerStateManager({ label, date, dispatchDate, maxDate }) {
    const [startDate, setStartDate] = useState(date)

    console.log('FormDatePickerStateManager has re-render from ', label)

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
