import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AuthBackground from '../../Component/AuthBackground'
import { FULL_HEIGHT } from '../../Constants/Dimensions'

const MyAccount = () => {
  return (
    <View style={styles.mainContainer}>
   <View style={styles?.fieldCard}>

   </View>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

  },
  fieldCard:{
    backgroundColor:'white',
    height:FULL_HEIGHT*0.8
  }
})