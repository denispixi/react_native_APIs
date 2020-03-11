import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  /*
   * __DEV__ true if app is in dev mode, otherwise false
   * typeof atob 'undefined' if RN remote debug is off, else 'function'
   */
  let store = createStore(
    persistedReducer,
    ...(
      __DEV__ && typeof atob !== 'undefined' ?
        [typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()] :
        []
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}