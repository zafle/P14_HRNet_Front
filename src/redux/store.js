import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { employeeSlice } from './features/employeeSlice'
import { employeesSlice } from './features/employeesSlice'
import { formControlSlice } from './features/formControlSlice'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    formControl: formControlSlice.reducer,
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
