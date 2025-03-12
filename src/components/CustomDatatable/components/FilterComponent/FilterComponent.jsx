import PropTypes from 'prop-types'
import './_FilterComponent.scss'

export default function FilterComponent({ onFilter, onClear, filterText }) {
  return (
    <div className="datatable-filter">
      <input
        className="datatable-filter__input"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={filterText}
        onChange={onFilter}
      />
      <button
        className="datatable-filter__button"
        type="button"
        onClick={onClear}
      >
        X
      </button>
    </div>
  )
}

FilterComponent.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
}
