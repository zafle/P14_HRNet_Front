import { setDefaultLocale } from 'react-datepicker'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'
import './_App.scss'

function App() {
  setDefaultLocale('en-US')

  return <RouterProvider router={router} />
}

export default App
