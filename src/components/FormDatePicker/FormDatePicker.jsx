import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getMonth, getYear } from 'date-fns'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import './_FormDatePicker.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormControl } from '../../redux/selectors'
import { formControlSlice } from '../../redux/features/formControlSlice'
// import { getEmployee } from '../../redux/selectors'
// import { employeeSlice } from '../../redux/features/employeeSlice'

export default function FormDatePicker({ label, date, setDate, maxDate }) {
  const dispatch = useDispatch()
  const { clearDate } = useSelector(getFormControl)
  // const { clearDate } = useSelector(getEmployee)
  // const [clearDate, setClearDate] = useState(false)

  //
  const startDate = date ? new Date(date) : null
  const [selectedDate, setSelectedDate] = useState(startDate)

  useEffect(() => {
    if (clearDate === true) {
      console.log('clear date')
      setDate(null)
      setSelectedDate(null)
      dispatch(formControlSlice.actions.setClearDate(false))
      // setClearDate(false)
    }
  }, [clearDate, dispatch, setDate])

  const handleChangeSelectedDate = (date) => {
    setSelectedDate(date)
    setDate(date?.toString() || null)
  }

  const years = range(1900, getYear(new Date()) + 1, 1)
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

  return (
    <>
      <label className="datePickerFormLabel">{label}</label>

      <DatePicker
        renderCustomHeader={({
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
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
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
        )}
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
}

FormDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  maxDate: PropTypes.object,
}
