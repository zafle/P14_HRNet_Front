import { Outlet } from 'react-router'
import { HeaderMemo } from '../Header/Header'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from '../../redux/store'
import { Suspense } from 'react'

/**
 * Displays the site layout used in Router
 *
 * @returns {React.ReactElement} Layout main site
 */
export default function Layout() {
  return (
    <>
      <HeaderMemo />
      <main>
        <Provider store={store}>
          <PersistGate loading="Loading..." persistor={persistor}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </PersistGate>
        </Provider>
      </main>
    </>
  )
}
