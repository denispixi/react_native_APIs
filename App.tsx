import * as React from 'react'
import Routes from './src/routes'
import { StatusBar, View } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { useColorScheme } from 'react-native-appearance'
import { useTheme } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './src/redux'
enableScreens()

const { store, persistor } = createStore()

function App() {
  
  const scheme = useColorScheme()
  const { colors } = useTheme()
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar barStyle={scheme === 'light' ? "dark-content" : 'light-content'} />
          <Routes />
        </View>
      </PersistGate>
    </Provider>

  )
}

export default App