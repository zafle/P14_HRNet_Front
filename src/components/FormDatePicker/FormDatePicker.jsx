import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getMonth, getYear } from 'date-fns'
import range from 'lodash/range'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormControl } from '../../redux/selectors'
import { formControlSlice } from '../../redux/features/formControlSlice'
import PropTypes from 'prop-types'
import './_FormDatePicker.scss'

/**
 * Displays a memoized FormDatePicker component
 * - Uses DatePicker component
 * - Used in Home form Create Employee
 *
 * @param {string} label DatePicker label
 * @param {string} date DatePicker date state
 * @param {function} setDate onChange date function
 * @param {Date} maxDate selectable max date
 *
 */
export const FormDatePickerMemo = memo(function FormDatePicker({
  label,
  date,
  setDate,
  maxDate,
}) {
  const dispatch = useDispatch()

  // get clearDate state to know when DatePicker
  // has to reset after form submitting
  const { clearDate } = useSelector(getFormControl)

  // Formats the stored string date into new Date
  const startDate = useMemo(() => (date ? new Date(date) : null), [date])

  // Creates a local state for selected date value
  const [selectedDate, setSelectedDate] = useState(startDate)

  // Reset DatePicker after form submitting
  useEffect(() => {
    if (clearDate === true) {
      setDate(null)
      setSelectedDate(null)
      dispatch(formControlSlice.actions.setClearDate(false))
    }
  }, [clearDate, dispatch, setDate])

  const handleChangeSelectedDate = useCallback(
    (date) => {
      setSelectedDate(date)
      setDate(date?.toString() || null)
    },
    [setSelectedDate, setDate]
  )

  // Creates the dates range to display in calendar
  const years = useMemo(() => range(1900, getYear(new Date()) + 1, 1), [])

  // Month names to display in custom calendar header
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const customHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="react-datepicker__header-controls">
      <button
        type="button"
        className="react-datepicker__header-button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        {'<'}
      </button>

      <select
        className="react-datepicker__header-select"
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="react-datepicker__header-select"
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="react-datepicker__header-button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        {'>'}
      </button>
    </div>
  )

  return (
    <>
      <label className="datePickerFormLabel">{label}</label>

      <DatePicker
        renderCustomHeader={customHeader}
        selected={selectedDate}
        onChange={handleChangeSelectedDate}
        maxDate={maxDate ? maxDate : null}
        isClearable
        placeholderText="Select a date"
        todayButton="Today"
        fixedHeight
      />
    </>
  )
})

FormDatePickerMemo.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  maxDate: PropTypes.object,
}
