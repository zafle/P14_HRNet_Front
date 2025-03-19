import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { setDefaultLocale } from 'react-datepicker'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'
import './_App.scss'

function App() {
  setDefaultLocale('en-US')

  return (
    <Provider store={store}>
      <PersistGate loading="Loading..." persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App
