import PropTypes from 'prop-types'
import './_EditButton.scss'

/**
 * Displays the edit button in Data table
 *
 * @param {Object} row the button's Data Table row
 * @param {function} editAction the function to call on click button
 *
 * @returns
 */
export default function EditButton({ row, editAction }) {
  const handleOnClick = () => {
    editAction(row.id)
  }
  return (
    <button
      className="datatable__edit-button"
      onClick={handleOnClick}
      aria-label="edit"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="15px"
        height="18px"
        viewBox="0 0 121.48 122.88"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M96.84,2.22l22.42,22.42c2.96,2.96,2.96,7.8,0,10.76l-12.4,12.4L73.68,14.62l12.4-12.4 C89.04-0.74,93.88-0.74,96.84,2.22L96.84,2.22z M70.18,52.19L70.18,52.19l0,0.01c0.92,0.92,1.38,2.14,1.38,3.34 c0,1.2-0.46,2.41-1.38,3.34v0.01l-0.01,0.01L40.09,88.99l0,0h-0.01c-0.26,0.26-0.55,0.48-0.84,0.67h-0.01 c-0.3,0.19-0.61,0.34-0.93,0.45c-1.66,0.58-3.59,0.2-4.91-1.12h-0.01l0,0v-0.01c-0.26-0.26-0.48-0.55-0.67-0.84v-0.01 c-0.19-0.3-0.34-0.61-0.45-0.93c-0.58-1.66-0.2-3.59,1.11-4.91v-0.01l30.09-30.09l0,0h0.01c0.92-0.92,2.14-1.38,3.34-1.38 c1.2,0,2.41,0.46,3.34,1.38L70.18,52.19L70.18,52.19L70.18,52.19z M45.48,109.11c-8.98,2.78-17.95,5.55-26.93,8.33 C-2.55,123.97-2.46,128.32,3.3,108l9.07-32v0l-0.03-0.03L67.4,20.9l33.18,33.18l-55.07,55.07L45.48,109.11L45.48,109.11z M18.03,81.66l21.79,21.79c-5.9,1.82-11.8,3.64-17.69,5.45c-13.86,4.27-13.8,7.13-10.03-6.22L18.03,81.66L18.03,81.66z"
          />
        </g>
      </svg>
    </button>
  )
}

EditButton.propTypes = {
  row: PropTypes.object.isRequired,
  editAction: PropTypes.func.isRequired,
}
