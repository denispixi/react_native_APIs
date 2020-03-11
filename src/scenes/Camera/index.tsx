import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, Button, Linking, Alert } from 'react-native'
import { DefaultTheme } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Ionicons as Ionicon } from '@expo/vector-icons'

import Modal from 'react-native-modal'
import { SizedBox } from '../../components'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [pictureTaked, setPictureTaked] = useState<string>(null)
  const [qrData, setQrData] = useState<string>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [qrDetection, setQrDetection] = useState<boolean>(true)

  const qrScannerOn = useRef(true)

  const cameraRef = useRef(null)
  useEffect(() => {
    console.log('heyyyy');
  })

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      console.log('status:::', status)
      setHasPermission(status === 'granted')
    })()
  }, [])

  useEffect(() => {
    if (pictureTaked) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={restartCamera}>
            <Text style={{ color: DefaultTheme.colors.primary, fontSize: 18 }}>Descartar</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [pictureTaked])

  const restartCamera = () => {
    setPictureTaked(null)
  }

  const takePicture = async () => {
    if (cameraRef) {
      let { uri, width, height } = await cameraRef.current.takePictureAsync()
      setPictureTaked(uri)
    }
  }

  const switchCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const onBarCodeScanned = ({ type, data }) => {
    console.log("bar code scanned", { type, data })
    if (data.startsWith('http://') || data.startsWith('https://')) {
      askOpenUrl(data)
    } else {
      setQrData(data)
      setModalVisible(true)
    }
  }

  const askOpenUrl = (url: string) => {
    if (qrScannerOn.current) {
      qrScannerOn.current = false
      Alert.alert(
        'HTTP URL detected',
        'Do you want to open the link?',
        [
          {
            text: 'Cancel',
            onPress: () => { qrScannerOn.current = true },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              qrScannerOn.current = true
              openBrowserAsync(url)
            }
          },
        ],
        { cancelable: false },
      )
    }
  }

  const openBrowserAsync = async (url: string) => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log({ error })
    }
  };

  if (pictureTaked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', }}>
        <Image
          style={{ height: '80%', width: '100%' }}
          resizeMode="contain"
          source={{ uri: pictureTaked }}
        />
      </View>
    )
  } else {
    if (hasPermission === null) {
      return <View />
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <View style={{ flex: 1 }}>

        <Camera
          style={{ flex: 1 }}
          type={type}
          onBarCodeScanned={modalVisible ? null : onBarCodeScanned}
          barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
          ref={cameraRef}>

          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {/* Take pic button */}
            <View style={styles.takePicContainer}>
              <TouchableOpacity
                style={styles.takePicButton}
                onPress={takePicture}
              />
              <TouchableOpacity style={{ position: 'absolute', right: 30 }} onPress={switchCamera}>
                <Ionicon
                  name="ios-reverse-camera"
                  size={50}
                  color="#ddd"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>

        <Modal
          useNativeDriver
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20 }}>
              {'Información en el QR'}
            </Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              {qrData}
            </Text>
            <SizedBox />
            <Button
              title="Ocultar modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  takePicContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    height: '20%',
    width: '100%',
    justifyContent: 'center',
  },
  takePicButton: {
    borderRadius: SCREEN_HEIGHT * .2 / 2,
    height: SCREEN_HEIGHT * .2 * .5,
    width: SCREEN_HEIGHT * .2 * .5,
    backgroundColor: 'transparent',
    borderColor: '#ddd',
    borderWidth: 5,
    alignSelf: 'center'
  },
  topBlur: {
    height: '25%',
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    height: 350
  },
})

export default CameraScreen