import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import Images from '../Constants/Images'
import {FULL_HEIGHT, FULL_WIDTH} from '../Constants/Dimensions'


interface AuthBackground {
  children: ReactNode
}

const AuthBackground = (
    {children}:AuthBackground
) => {
  return (
  <ImageBackground
  source={Images?.AuthBackground}
  style={styles?.bg}
    resizeMode="cover"
  >
{children}

  </ImageBackground>
  )
}

export default AuthBackground

const styles = StyleSheet.create({
    bg:{
        flex:1,
        height:FULL_HEIGHT,
        width:FULL_WIDTH,
        
    }
})