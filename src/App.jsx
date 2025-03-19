import Router from './router/Router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { setDefaultLocale } from 'react-datepicker'

import './_App.scss'

function App() {
  setDefaultLocale('en-US')

  return (
    <Provider store={store}>
      <PersistGate loading="Loading..." persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
