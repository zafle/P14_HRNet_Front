import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getMonth, getYear } from 'date-fns'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import './_FormDatePicker.scss'

export function FormDatePicker({
  label,
  selectedDate,
  setSelectedDate,
  maxDate,
}) {
  const formattedDate = selectedDate ? new Date(selectedDate) : null

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
    <div>
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
        selected={formattedDate}
        onChange={setSelectedDate}
        maxDate={maxDate ? maxDate : null}
        isClearable
        placeholderText="Select a date"
        todayButton="Today"
        fixedHeight
      />
    </div>
  )
}

FormDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func.isRequired,
  maxDate: PropTypes.object,
}
