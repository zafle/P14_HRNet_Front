import { Link, NavLink } from 'react-router'
import logo from '../../assets/logo_wealth_health.png'
import './_Header.scss'

/**
 * Displays the main App Header
 *
 * @returns {React.ReactElement} Main App Header
 */
function Header() {
  return (
    <header className="mainheader">
      <Link to="/">
        <div className="mainheader__brand">
          <img
            className="mainheader__brand--logo"
            src={logo}
            alt="logo Wealth Health"
          />
          <span className="mainheader__brand--text">HRNet</span>
        </div>
      </Link>
      <nav className="mainheader__nav">
        <NavLink className="mainheader__nav--link" to="/">
          Home
        </NavLink>
        <NavLink className="mainheader__nav--link" to="/employee-list">
          Current Employees
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
