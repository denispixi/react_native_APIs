import React, { useState } from 'react'
import { View, Button, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { SizedBox, Text } from '../../components'

function DateTimePickerScreen() {
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState<any>('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date

    setDate(currentDate)
    setShow(Platform.OS === 'ios' ? true : false)
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  return (
    <View style={styles.center}>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <SizedBox />
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <SizedBox />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
          style={styles.dateTimePicker}
        />
      )}
      <SizedBox />
      <Text style={{ fontSize: 30 }}>
        {date.toLocaleString()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimePicker: {
    width: '100%',
    // height: 20,
    color: 'black'
  }
})

export default DateTimePickerScreen