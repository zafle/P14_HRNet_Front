import { Outlet } from 'react-router'
import Header from '../Header/Header'

/**
 * Displays the site layout used in Router
 *
 * @returns {React.ReactElement} Layout main site
 */
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
