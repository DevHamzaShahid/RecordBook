import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { PaymentRequest } from 'react-native-payments'

const index = () => {
  const isApplePaySupported = () => {
    return Platform.OS === 'ios'
  }
  useEffect(() => {
    if (isApplePaySupported()) {
      alert('this device is applePay supported')
    } else {
      alert('this device is not applePay supported')
    }
  }, []);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index