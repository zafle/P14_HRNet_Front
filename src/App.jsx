import Router from './router/Router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import './_App.scss'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading="Loading..." persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
