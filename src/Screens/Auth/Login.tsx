import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FULL_HEIGHT } from '../../Constants/Dimensions'
import AuthBackground from '../../Component/AuthBackground'
import KeyboardWrapper from '../../Component/UI/KeyboardWrapper'
import Input from '../../Component/UI/Input'
import Header from '../../Component/UI/Header'
import Typography from '../../Component/UI/Typography'
import { Colors } from '../../Constants/colors'
import Font from '../../Constants/Font'

const Login = () => {
  return (
    <View style={styles?.mainView}>
      <Header title='Scypt' styleMain={{ alignItems: "center" }} />
      <View style={styles?.screenView}>
        <View style={styles?.wellcomeText}>
          <Typography size={36} color={Colors?.titleBlack} fontFamily={Font?.ExtraBold}>Welcome Back!</Typography>
          <Typography style={{ marginTop: 10 }} size={16} color={Colors?.placeHolderColor} fontFamily={Font?.Medium}>Your friends and messages are waiting.</Typography>

        </View>
        <View style={styles?.mainCard}>
          <Input iconName='profile_Tab' title='FULL NAME' placeholder='Sachin Verma' placeholderTextColor={Colors?.placeHolderColor} />
          <Input iconName='profile_Tab' title='FULL NAME' placeholder='Sachin Verma' placeholderTextColor={Colors?.placeHolderColor} />
          <Input iconName='profile_Tab' title='FULL NAME' placeholder='Sachin Verma' placeholderTextColor={Colors?.placeHolderColor} />
          <Input iconName='profile_Tab' title='FULL NAME' placeholder='Sachin Verma' placeholderTextColor={Colors?.placeHolderColor} />
        </View>

      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors?.white
  },
  screenView: {
    padding: 22,
    marginTop: 10,
    justifyContent: "center",
    // alignItems:"center"
  },
  wellcomeText: { alignItems: "center" },
  mainCard: {
    padding: 22,
    backgroundColor: Colors?.white,
    borderRadius: 24,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors?.borderColor,
    marginTop: 20
  },

})