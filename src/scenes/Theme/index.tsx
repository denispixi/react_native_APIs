import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { SizedBox } from '../../components'
import { useDispatch } from 'react-redux'
import { setTheme, Themes } from '../../redux/config/actions'

function ThemeScreen() {
  const dispatch = useDispatch()

  const setLightTheme = () => {
    dispatch(setTheme(Themes.LIGTH))
  }

  const setDarkTheme = () => {
    dispatch(setTheme(Themes.DARK))
  }

  const setSystemTheme = () => {
    dispatch(setTheme(Themes.SYSTEM))
  }

  return (
    <View style={styles.center}>
      <Button title="Set ligth theme" onPress={setLightTheme} />
      <SizedBox height={50} />
      <Button title="Set dark theme" onPress={setDarkTheme} />
      <SizedBox height={50} />
      <Button title="Set system theme" onPress={setSystemTheme} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ThemeScreen