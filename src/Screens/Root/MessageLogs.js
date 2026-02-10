import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from '../../Component/UI/Input'

const MessageLogs = () => {
  return (
    <View style={styles?.mainView}>
      <Input/>
    </View>
  )
}

export default MessageLogs

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})