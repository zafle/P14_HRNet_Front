import PropTypes from 'prop-types'

export default function FilterComponent({ onFilter, onClear, filterText }) {
  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <button type="button" onClick={onClear}>
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
