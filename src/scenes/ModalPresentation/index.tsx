import React from 'react'
import { View, Button, Text } from 'react-native';

function ModalPresentationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>This is a modal presentation :v</Text>
      <Button title="Dismiss modal" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default ModalPresentationScreen