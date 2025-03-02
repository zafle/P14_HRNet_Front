import { Provider } from 'react-redux'
// import { store, persistor } from './redux/store'
// import styles from './App.module.scss'

import './_App.scss'
import Router from './router/Router'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading="" persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
