import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import AuthBackground from '../../Component/AuthBackground'
import { FULL_HEIGHT } from '../../Constants/Dimensions'
import Input from '../../Component/UI/Input'

const MessageLogs = ({navigation}) => {
  return (
    <View style={styles?.mainView}>
 <AuthBackground >

  <View style={styles?.fieldCard}>

<Input
title='Title'
/>
   </View>
    </AuthBackground>
    </View>
  )
}

export default MessageLogs

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  fieldCard:{
    backgroundColor:"white",
    margin:22,
    marginTop:150,
    borderRadius:20,
    height:FULL_HEIGHT*0.5,
  }
})