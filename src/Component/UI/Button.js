import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Typography from '../UI/Typography'
import Font from '../../Constants/Font'
const Button = ({ style, text,onPress }) => {
  return (
    <TouchableOpacity style={styles?.mainView} activeOpacity={0.9} onPress={onPress}>
      <LinearGradient style={[styles?.gradiant, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#ADD6FF', '#84C1FF']}> 
        <Typography color='#FFF' size={22} fontFamily={Font?.SemiBold}>{text}</Typography>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  gradiant: {
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 50
  },

})