import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'
import { useTheme } from '@react-navigation/native';

type Props = {
  style?: TextStyle
  children?: string
}

const Text = ({ style = {}, children = '' }: Props) => {
  const { colors } = useTheme()
  return (
    <RNText style={[{ color: colors.text }, style]}>
      {children}
    </RNText>
  )
}

export { Text }