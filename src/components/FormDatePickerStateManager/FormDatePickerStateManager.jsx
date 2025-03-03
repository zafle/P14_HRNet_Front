import { useEffect, useState } from 'react'
import FormDatePicker from '../FormDatePicker/FormDatePicker'
import PropTypes from 'prop-types'

export default function FormDatePickerStateManager({
  label,
  date,
  dispatchDate,
  maxDate,
}) {
  const [startDate, setStartDate] = useState(date)

  useEffect(() => {
    if (startDate !== date) {
      dispatchDate(startDate)
    }
  }, [startDate, date, dispatchDate])

  return (
    <FormDatePicker
      label={label}
      date={startDate}
      setDate={setStartDate}
      maxDate={maxDate ? maxDate : null}
    />
  )
}

FormDatePickerStateManager.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string,
  dispatchDate: PropTypes.func.isRequired,
  maxDate: PropTypes.object,
}
