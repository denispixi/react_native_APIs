import React, { useEffect, useState } from 'react'
import { View, Button, Platform, Image, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

function ImagePickerScreen() {
  const [mediaUri, setMediaUri] = useState<string>(null)
  const [mediaType, setMediaType] = useState<'video' | 'image'>(null)

  const pickImage = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      console.log({ status })
      if (status !== 'granted')
        return alert('Sorry, we need camera roll permissions to make this work!')
    }
    let { cancelled, uri, type }: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!cancelled) {
      setMediaUri(uri)
      setMediaType(type)
    }
  }

  const capturePictureOrVideoFromCamera = (isVideo: boolean = false) => async () => {
    if (Platform.OS === 'ios') {
      const [{ status: cameraRollStatus }, { status: cameraStatus }] = await Promise.all([
        ImagePicker.requestCameraRollPermissionsAsync(),
        ImagePicker.requestCameraPermissionsAsync(),
      ])
      if (cameraRollStatus !== 'granted' || cameraStatus !== 'granted')
        return alert('Sorry, we need camera and camera roll permissions to make this work!')
    }
    let { cancelled, uri, type }: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[isVideo ? 'Videos' : 'Images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...(isVideo ? { videoExportPreset: ImagePicker.VideoExportPreset.HighestQuality } : {})
    })
    if (!cancelled) {
      setMediaUri(uri)
      setMediaType(type)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Button
        title="Pick Image from gallery"
        onPress={pickImage}
      />
      <View style={{ height: 30 }} />
      <Button
        title="Take Image from camera"
        onPress={capturePictureOrVideoFromCamera()}
      />
      <View style={{ height: 30 }} />
      <Button
        title="Record Video"
        onPress={capturePictureOrVideoFromCamera(true)}
      />
      <View style={{ height: 30 }} />
      {mediaType === 'image' && mediaUri &&
        <Image
          source={{ uri: mediaUri }}
          style={{ width: SCREEN_WIDTH * .8, height: SCREEN_WIDTH * .8, marginTop: 30 }}
        />}
      {mediaType === 'video' && mediaUri &&
        <Video
          source={{ uri: mediaUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
        />}
    </View>
  )
}

export default ImagePickerScreen