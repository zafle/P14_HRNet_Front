import PropTypes from 'prop-types'

export default function MainTitle({ title }) {
  return <h1 className="maintitle">{title}</h1>
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
