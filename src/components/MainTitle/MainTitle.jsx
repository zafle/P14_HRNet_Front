import PropTypes from 'prop-types'
import './_MainTitle.scss'

/**
 * Displays the <h1> page title
 *
 * @param {string} title page title
 *
 * @returns {React.ReactElement} page main title
 */
export default function MainTitle({ title }) {
  return <h1 className="maintitle">{title}</h1>
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
