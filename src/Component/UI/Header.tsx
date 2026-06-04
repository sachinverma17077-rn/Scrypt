import { ImageBackground, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Typography from './Typography';
import { Colors } from '../../Constants/colors';
import Font from '../../Constants/Font';
import Images from '../../Constants/Images';


interface Header {
  title: string;
  styleMain: StyleProp<ViewStyle>
}

const Header = ({
  title,
  styleMain = {}

}: Header) => {
  return (
    <ImageBackground
    imageStyle={{resizeMode:'cover'}}
      source={Images?.headerImage}
      style={[styles?.mainView, styleMain]}>
      <Typography color={Colors?.titleText} size={24} fontFamily={Font?.SemiBold}>{title}</Typography>
    </ImageBackground>
  )
}

export default Header

const styles = StyleSheet.create({
  mainView: {
    height: 120,
    // backgroundColor: Colors?.white,
    // elevation: 2,
    padding: 22,
    paddingTop: 40,
    resizeMode:"contain"
  }
})