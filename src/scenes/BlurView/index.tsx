import React, { useState } from 'react';
import { Image, StyleSheet, View, Dimensions, Slider, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get("window")
const uri = 'https://www.stickpng.com/assets/images/5847f9cbcef1014c0b5e48c8.png'
const uri2 = 'https://angular.github.io/react-native-renderer/assets/react.png'

function BlurViewScreen() {

  const [intensity, setIntensity] = useState(50);

  function onSliderChange (value) {
    setIntensity(value)
  }
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute" }}>
        <Image style={{ height, width, resizeMode: 'repeat' }} source={{ uri }} />
      </View>

      {/* Adjust the tint and intensity */}
      <BlurView tint="dark" intensity={intensity} style={styles.notBlurred}>
        <Image style={{ width: 300, height: 300 }} source={{ uri: uri2 }} />
      </BlurView>

      <SafeAreaView style={styles.sliderContainer}>
        <Slider
          maximumValue={100}
          style={{ width: '80%' }}
          minimumTrackTintColor="lawngreen"
          maximumTrackTintColor="white"
          onValueChange={onSliderChange}
          value={50}
          step={1}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notBlurred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  sliderContainer: {
    position: "absolute",
    bottom: 60,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  }
})

export default BlurViewScreen