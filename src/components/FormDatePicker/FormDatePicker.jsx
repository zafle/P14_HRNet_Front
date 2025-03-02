import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './_FormDatePicker.scss'

export function FormDatePicker({ label, selectedDate, onchange }) {
  const formattedDate = selectedDate ? new Date(selectedDate) : null

  return (
    <div>
      <label className="datePickerFormLabel">
        {label}
        <DatePicker
          selected={formattedDate}
          onChange={onchange}
          isClearable
          placeholderText="Select a date"
        />
      </label>
    </div>
  )
}
