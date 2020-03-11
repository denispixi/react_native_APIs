import React, { useMemo } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { RootState } from '../redux/reducers'
import {
  HomeScreen,
  BlurViewScreen,
  CameraScreen,
  ContactsScreen,
  DateTimePickerScreen,
  ImagePickerScreen,
  ModalPresentationScreen
} from '../scenes'
import ThemeScreen from '../scenes/Theme';
import { useSelector } from 'react-redux';
import { Themes } from '../redux/config/actions';
import { View, StatusBar } from 'react-native';

// const Stack = createStackNavigator()
const Stack = createNativeStackNavigator()

function Routes() {
  const scheme = useColorScheme()
  const { theme } = useSelector((store: RootState) => store.theme)

  const getTheme = useMemo(() => {
    switch (theme) {
      case Themes.LIGTH:
        return DefaultTheme;
      case Themes.DARK:
        return DarkTheme;
      case Themes.SYSTEM:
      default:
        return scheme === 'dark' ? DarkTheme : DefaultTheme;
    }
  }, [theme, scheme])

  const getStatusBarTheme = useMemo(() => {
    switch (theme) {
      case Themes.LIGTH:
        return 'dark-content';
      case Themes.DARK:
        return 'light-content';
      case Themes.SYSTEM:
      default:
        return scheme === 'dark' ? 'light-content' : 'dark-content';
    }
  }, [theme, scheme])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={getStatusBarTheme} />
      <AppearanceProvider>
        <NavigationContainer theme={getTheme}>
          <Stack.Navigator
            screenOptions={{}}
            initialRouteName="Home">

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Expo APIs', headerLargeTitle: true }}
            />
            <Stack.Screen
              name="BlurView"
              component={BlurViewScreen}
              options={{ title: 'BlurView' }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{ title: 'Camera' }}
            />
            <Stack.Screen
              name="Contacts"
              component={ContactsScreen}
              options={{ title: 'Contacts' }}
            />
            <Stack.Screen
              name="ImagePicker"
              component={ImagePickerScreen}
              options={{ title: 'ImagePicker' }}
            />
            <Stack.Screen
              name="DateTimePicker"
              component={DateTimePickerScreen}
              options={{ title: 'DateTimePicker' }}
            />
            <Stack.Screen
              name="ModalPresentation"
              component={ModalPresentationScreen}
              options={{ title: 'ModalPresentation', stackPresentation: "modal" }}
            />
            <Stack.Screen
              name="Theme"
              component={ThemeScreen}
              options={{ title: 'Theme' }}
            />

          </Stack.Navigator>
        </NavigationContainer>

      </AppearanceProvider>
    </View>
  )
}

export default Routes