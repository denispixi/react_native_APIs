import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons as Ionicon } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { Text } from '../../components'
import { RootState } from '../../redux/reducers'


const SCREEN_LIST = [
  'BlurView',
  'Camera',
  'Contacts',
  'DateTimePicker',
  'ImagePicker',
  'ModalPresentation',
  'Theme',
]

function HomeScreen({ navigation }) {
  const { colors } = useTheme()
  const theme = useSelector((store: RootState) => store.theme)

  useEffect(() => {
    console.log({ theme })
  }, [])

  const pushScreen = (screen: string) => () => navigation.push(screen)

  return (
    <ScrollView>
      {SCREEN_LIST.map((screen: string, index: number) => {
        return (
          <TouchableOpacity
            style={[styles.goToScreen, {
              borderTopWidth: index == 0 ? 0 : .3,
              borderBottomWidth: index == SCREEN_LIST.length - 1 ? .6 : .3,
              borderColor: colors.border
            }]}
            onPress={pushScreen(screen)}
            key={index}>
            <Text style={{ fontSize: 18 }}>{screen}</Text>
            <Ionicon
              name="ios-arrow-forward"
              size={32} color={colors.border}
            />
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  goToScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: .8,
    borderBottomWidth: .8,
    // backgroundColor: 'white'
  }
})

export default HomeScreen