import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FULL_HEIGHT } from '../../Constants/Dimensions'
import AuthBackground from '../../Component/AuthBackground'
import KeyboardWrapper from '../../Component/UI/KeyboardWrapper'
import Input from '../../Component/UI/Input'

const Login = () => {
  return (
        <View style={styles?.mainView}>
          <AuthBackground >
            <KeyboardWrapper>
    
            <View style={styles?.fieldCard}>
    
              <Input
                title='First Name'
                
              />
               <Input
                title='Last Name'
                
              />
              <Input
                title='Email'
                
              />
              <Input
                title='Phone Number'
                
              />
              
            </View>
            </KeyboardWrapper>
          </AuthBackground>
        </View>
  )
}

export default Login

const styles = StyleSheet.create({
    mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  fieldCard: {
    backgroundColor: "white",
    margin: 22,
    marginTop: 150,
    borderRadius: 20,
    height: FULL_HEIGHT * 0.5,
  }
})