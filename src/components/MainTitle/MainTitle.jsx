import PropTypes from 'prop-types'
import './_MainTitle.scss'

export default function MainTitle({ title }) {
  return <h1 className="maintitle">{title}</h1>
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
