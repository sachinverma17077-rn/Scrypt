import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Images from '../../Constants/Images'
import icons from '../../Constants/icons'


const ComingSoon = () => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Image source={icons?.ComingSoon}  style={{height:150,width:150}}/>
    </View>
  )
}

export default ComingSoon

const styles = StyleSheet.create({})