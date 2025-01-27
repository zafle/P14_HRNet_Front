import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storageSession from 'redux-persist/lib/storage/session'
import { employeeSlice } from './features/employeeSlice'
import { persistStore, persistReducer } from 'redux-persist'
import { employeesSlice } from './features/employeesSlice'

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    employee: employeeSlice.reducer,
    employees: employeesSlice.reducer,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore persist actions to prevent errors related to non-serializable values
      // These actions (e.g., persist/PERSIST, persist/REHYDRATE) are used internally by redux-persist
      // and may include non-serializable values, which the middleware would otherwise flag as errors.
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})
export const persistor = persistStore(store)

// const employeesPersistConfig = {
//   key: 'employees',
//   storage: storageSession,
// }

// export const store = configureStore({
//   reducer: combineReducers({
//     employee: employeeSlice.reducer,
//     employees: persistReducer(employeesPersistConfig, employeesSlice.reducer),
//   }),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // Ignore persist actions to prevent errors related to non-serializable values
//       // These actions (e.g., persist/PERSIST, persist/REHYDRATE) are used internally by redux-persist
//       // and may include non-serializable values, which the middleware would otherwise flag as errors.
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// })

// Create a persistant store
// export const persistor = persistStore(store)
