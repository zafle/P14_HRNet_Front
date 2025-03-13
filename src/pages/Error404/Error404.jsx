import { Link } from 'react-router'
import Illustration from '../../assets/404-Error-illustration.svg'
import './_Error404.scss'

export default function Error404() {
  return (
    <main>
      <div className="page-404">
        <img
          className="page-404__illustration"
          src={Illustration}
          alt="Error 404 - Page not found"
        />
        <Link className="page-404__link" to="/home">
          Back to home
        </Link>
      </div>
    </main>
  )
}
