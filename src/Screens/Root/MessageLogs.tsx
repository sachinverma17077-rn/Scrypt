import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const MessageLogs = ({ navigation }) => {
  return (
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
  <Text>Login Screen</Text>
</TouchableOpacity>
</View>
  )
}

export default MessageLogs

const styles = StyleSheet.create({

})